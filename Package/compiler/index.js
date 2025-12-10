import parse from "../parser/Parse1.js";

import makeUidGenerator from "./UIdgeneratot.js";
import { getTagName, isElement, isComponentTag } from "./helpers/index.js";
import processAll from "./processors/index.js";

function compileTojs(html) {
  const root = parse(html, true);
  //console.log(JSON.stringify(root, null, 2));

  const uid = makeUidGenerator();

  const addToparent = !isComponentTag(getTagName(root));
  const output = [];
  const rootId = uid.nextElement() ;

  processAll(root, output, uid, rootId);

  console.log("\n\n\n");
  let code = "";
  if (addToparent) {
    code = `return ${rootId};`;
  }

  output.push(code);

  return output.join("\n");
}

export default compileTojs;
