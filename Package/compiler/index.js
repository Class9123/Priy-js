import parse from "../parser/Parse1.js";
import beautify from "js-beautify";
import makeUidGenerator from "./UIdgeneratot.js";
import {
  getTagName,
  isElement,
  isComponentTag
} from "./helpers/index.js";
import processAll from "./processors/index.js";

function compileTojs(html, ast) {
  let root = ast;
  if (!ast) root = parse(html, true);
  //console.log(JSON.stringify(root, null, 2));

  const uid = makeUidGenerator();

  const addToparent = !isComponentTag(getTagName(root));
  const output = [];
  const rootId = uid.nextElement();

  processAll(root, output, uid, rootId);

  return beautify(output.join("\n"), {
    indent_size: 3
  })
}

export default compileTojs;