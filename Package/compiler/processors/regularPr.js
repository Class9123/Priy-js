import {
  getTagName,
  isComponentTag
} from "../helpers/index.js";
import BaseProcessor from "./baseModel.js";
import ConditionalProcessor from "./conditionalPr.js";
import LoopProcessor from "./loopPr.js";

const domProps = {
  checked: "checked",
  value: "value",
  selected: "selected",
  disabled: "disabled",
  readonly: "readOnly",
  hidden: "hidden"
};

export default class RegularProcessor extends BaseProcessor {
  constructor(registry) {
    super(registry);

    // Store processors that may override child handling
    this.processors = {
      if: new ConditionalProcessor(registry),
      for: new LoopProcessor(registry)
      // Add loop, etc. here later if needed
    };
  }

  reset() {
    this.out = this.registry.out;
    this.uidGen = this.registry.uidGen;
    this.processors.if.reset();
    this.processors.for.reset();
  }

  process(
    node,
    parentId = null,
    isRoot = false,
    isComponentChild = false,
    isSvgChilds = false
  ) {
    /*
      Must reas this ::
       parentId means the rootId here if isRoot is true
      */
    const tag = getTagName(node);
    const attrs = node.props;
    const controllers = {
      processChildren: true,
      addElement: true
    };

    if (isComponentTag(tag) || tag.includes(".")) {
      const arr = [];
      node.children.forEach(childNode => {
        arr.push(this.registry.processNode(childNode, parentId, true));
      });
      let props = "{ ";
      for (const key in attrs) {
        const valueNode = attrs[key];
        if (valueNode.type === "#jsx") {
          props += ` '${key}': ${valueNode.nodeValue}, `;
        } else {
          props += ` '${key}':'${valueNode}' ,`;
        }
      }
      if (arr.length > 0) props += ` children:[ ${arr.join(",")} ] `;
      props += "}";
      const id = this.uidGen.nextElement();
      if (isComponentChild) {
        this.addCode(`const ${id} = () => ${tag}(${props})
          `);
        return id;
      }
      if (isRoot) {
        this.addCode(`return ${tag}(${props})`)
      } else if (parentId !== null) {
        this.addCode(`
          _$.mountComponent(() => ${tag}(${props}), ${parentId} );
          `);
      }
      return;
    }

    const id = isRoot ? parentId: this.uidGen.nextElement();

    if (tag === "svg" || isSvgChilds) {
      this.addCode(`const ${id} = _$._elNs("${tag}");`);
    } else if (tag === "childs" && parentId !== null) {
      if (node.children.length !== 0) {
        throw new Error("childs should not  childrens");
        return;
      }
      this.addCode(`
        if (props.children)
        props.children.forEach(child => {
        if (typeof child === "function") _$.mountComponent(child, ${parentId})
        else ${parentId}.appendChild(child)
        })
        `);
      return;
    } else if (tag === "fragment") {
      this.addCode(`const ${id} = _$._fr();`);
    } else {
      this.addCode(`const ${id} = _$._el("${tag}");`);
    }

    for (const key in attrs) {
      if (key.startsWith("$")) {
        this.handleDollaredAttribute(
          node,
          id,
          parentId,
          key,
          attrs[key],
          controllers
        );
      } else {
        this.handleAttr(id, key, attrs[key]);
      }
    }

    if (controllers.processChildren) {
      this.processChildren(node, id);
    }

    if (!isRoot && controllers.addElement && !isComponentChild && parentId !== null) {
      this.addCode(`_$._appendTo(${parentId},${id});`);
    }
    if (isRoot) {
      this.addCode(`return ${id}`)
    }
    return id;
  }

  processChildren(node, parentId) {
    if (!node.children) return;
    for (const child of node.children) {
      if (getTagName(node) === "svg") {
        this.registry.processNode(child, parentId, false, true);
        //  isComponentChild , isSvgChild
      } else {
        this.registry.processNode(child, parentId);
      }
    }
  }

  handleDollaredAttribute(node, elId, parentId, name, valueNode, controllers) {
    if (valueNode.type !== "#jsx")
      throw new Error("Expected jsx value for $ attributes");
    const val = valueNode.nodeValue.trim();
    const key = name.slice(1);

    if (key === "if") {
      this.processors.if.process(node, elId, parentId, val);
      controllers.processChildren = false;
      controllers.addElement = false;
    } else if (key === "ref") {
      this.addCode(
        `(${val})(${elId})`
      );
    } else if (key === "html") {
      this.addCode(`${elId}.innerHTML += ${val};`);
    } else if (key === "show") {
      const fn = this.uidGen.nextEffectFn();
      const prev = this.uidGen.nextShowVariable();
      this.addCode(`
        let ${prev};
        const ${fn} = () => {
        const _c = ${val};
        if (_c !== ${prev}) {
        ${elId}.style.display = _c ? "" : "none";
        ${prev} = _c;
        }
        };
        _$._reactive(${fn});
        `);
    } else if (key === "for") {
      this.processors.for.process(node, elId, parentId, val);
      controllers.processChildren = false;
      controllers.addElement = false;
    }
  }

  handleAttr(elId, name, valueNode) {
    if (valueNode.type==="#spread"){
      const val = valueNode.nodeValue
      this.addCode(`
      for (const key in ${val}){
        ${elId}.setAttribute(key, JSON.stringify(${val}[key]) )
      }
      `)
      return
    }
    let isDynamic = valueNode.type === "#jsx"
    const val = isDynamic ? valueNode.nodeValue: valueNode;

    if (name.includes(":")) {
      if (!isDynamic) throw new Error('durective ":" expects jsx values only ');
      const [prefix,
        key] = name.split(":").map(s => s.trim());

      if (prefix === "on") {
        // Event handler binding
        this.addCode(`${elId}.on${key} = ${val};`);
        return;
      }
    }

    const isUnique = domProps[name] !== undefined;

    if (isDynamic) {
      const fn = this.uidGen.nextEffectFn();
      const code = isUnique
      ? `${elId}.${name} = ${val};`:
      `${elId}.setAttribute("${name}",${val})
      `
      
      this.addCode(`
        const ${fn} = () => {
        if (!${elId}.isConnected) return;
        ${code}
        };
        _$._reactive(${fn} , ()=>${val});
        ${code}
        `);
    } else {
      this.addCode(
        `${elId}.setAttribute("${name}","${val}");`)
    }
  }
}