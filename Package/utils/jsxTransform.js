import parser from "@babel/parser";
import tr from "@babel/traverse";
const traverse = tr.default;
import generate from "@babel/generator";
import * as t from "@babel/types";
import defaultJsxToJs from "../compiler/index.js";
import beautify from "js-beautify"

/**
* Convert a JSX node to your custom AST
*/
function getJsxTypeName(name) {
  if (t.isJSXIdentifier(name)) {
    return name.name;
  }

  if (t.isJSXMemberExpression(name)) {
    return `${getJsxTypeName(name.object)}.${getJsxTypeName(name.property)}`;
  }

  if (t.isJSXNamespacedName(name)) {
    return `${name.namespace.name}:${name.name.name}`;
  }

  return null;
}

function getAttrName(name) {
  if (t.isJSXIdentifier(name)) {
    return name.name;
  }

  if (t.isJSXNamespacedName(name)) {
    return `${name.namespace.name}:${name.name.name}`;
  }

  return null;
}

function jsxToCustomAst(node) {
  // ---------- Text ----------
  if (t.isJSXText(node)) {
    const text = node.value;
    if (!text.trim()) return null;

    return {
      type: "#text",
      nodeValue: text
    };
  }

  // ---------- Expressions ----------
  if (t.isJSXExpressionContainer(node)) {
    return {
      type: "#jsx",
      nodeValue: generate.default(node.expression).code
    };
  }

  // ---------- JSX Element (div, motion.div, Component) ----------
  if (t.isJSXElement(node)) {
    const opening = node.openingElement;
    const typeName = getJsxTypeName(opening.name);

    let props = {};
    for (const attr of opening.attributes) {
      if (t.isJSXSpreadAttribute(attr)){
        props[attr.argument.name] = {
          type : "#spread",
          nodeValue: attr.argument.name
        }
      }
      if (!t.isJSXAttribute(attr)) continue;

      const key = getAttrName(attr.name);
      
      if (!attr.value) {
        props[key] = true;
        continue;
      }

      if (t.isStringLiteral(attr.value)) {
        props[key] = attr.value.value;
        continue;
      }

      if (t.isJSXExpressionContainer(attr.value)) {
        props[key] = {
          type: "#jsx",
          nodeValue: generate.default(attr.value.expression).code
        };
      }
    }

    const children = node.children
    .map(jsxToCustomAst)
    .filter(Boolean);

    return {
      type: typeName,
      // motion.div, div, Component
      props,
      children
    };
  }

  // ---------- JSX Fragment <>...</> ----------
  if (t.isJSXFragment(node)) {
    const children = node.children
    .map(jsxToCustomAst)
    .filter(Boolean);

    return {
      type: "fragment",
      props: {},
      children
    };
  }

  return null;
}

function ensurePriyInternalImport(ast) {
  const body = ast.program.body;

  // 1️⃣ Check if already imported
  for (const node of body) {
    if (
      t.isImportDeclaration(node) &&
      node.source.value === "priy/internal"
    ) {
      // reuse existing default import name
      const def = node.specifiers.find(s =>
        t.isImportDefaultSpecifier(s)
      );
      return def?.local.name || null;
    }
  }

  // 2️⃣ Not imported → inject
  const localName = "_$";

  const importDecl = t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(localName))],
    t.stringLiteral("priy/internal")
  );

  // 3️⃣ Insert after last import
  let insertIndex = 0;
  while (
    insertIndex < body.length &&
    t.isImportDeclaration(body[insertIndex])
  ) {
    insertIndex++;
  }

  body.splice(insertIndex, 0, importDecl);

  return localName;
}

export default function compilePri(code, compileToJs = defaultJsxToJs) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: [
      ["jsx"]
    ]
  });
  ensurePriyInternalImport(ast)


  traverse(ast,
    {
      "JSXElement|JSXFragment"(path) {
        // Only handle top-level JSX
        if (path.parentPath.isJSXElement() || path.parentPath.isJSXFragment()) {
          return;
        }

        // Remove parentheses (return (<div/>))
        let realPath = path;
        while (realPath.parentPath.isParenthesizedExpression()) {
          realPath = realPath.parentPath;
        }

        // --- NEW: Build custom AST instead of raw string ---
        const customAst = jsxToCustomAst(realPath.node);
        
        //console.log(JSON.stringify(realPath.node, null, 2))
        console.log(JSON.stringify(customAst, null, 2))
        // Send the AST to your compiler
        const compiledJs = compileToJs("", customAst);

        const wrapped = `(function(){ ${compiledJs} })()`;

        let replacementAst;
        try {
          replacementAst = parser.parseExpression(wrapped);
        } catch (err) {
          throw new Error(
            `compileToJs returned invalid JS:\n${beautify(wrapped)}`
          );
        }

        // Replace entire JSX block
        realPath.replaceWith(replacementAst);
      },
      VariableDeclarator(path) {
        const {
          id,
          init
        } = path.node;

        // Match: const [ram, _] = useState(...)
        if (
          t.isArrayPattern(id) &&
          t.isCallExpression(init) &&
          t.isIdentifier(init.callee, {
            name: "useState"
          })
        ) {
          const stateId = id.elements[0];
          if (!t.isIdentifier(stateId)) return;

          const binding = path.scope.getBinding(stateId.name);
          if (!binding) return;

          binding.referencePaths.forEach(refPath => {
            // Skip cases where it's already called: ram()
            if (
              t.isCallExpression(refPath.parent) &&
              refPath.parent.callee === refPath.node
            ) {
              return;
            }

            refPath.replaceWith(
              t.callExpression(
                t.identifier(stateId.name),
                []
              )
            );
          });
        }
      }
    }
  );


  const outputCode = generate.default(ast,
    {},
    code).code;
  console.log(outputCode,"\n")
  return outputCode;
}