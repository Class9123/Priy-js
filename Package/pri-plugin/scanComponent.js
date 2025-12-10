import fs from "fs";
import beautify from "js-beautify";
import path from "path";

import compilePriToJs from "../compiler/index.js";
import transformAndWrapPri from "../utils/createSetupFunc.js";
import splitPriFile from "../utils/splitCode.js";

function transformPriFile(code) {
  const { jsPart, htmlPart, stylePart } = splitPriFile(code);
  const htmlScript = compilePriToJs(htmlPart);

  const script = transformAndWrapPri(jsPart, htmlScript);

 //console.log(beautify(script, { indent_size: 3 }));

  return { script };
}

export default function scanComponent(filePath) {
  const start = performance.now();
  const code = fs.readFileSync(filePath, "utf-8");
  console.log("\n\nTransforming file ", filePath, "\n\n");
  const jsCode = transformPriFile(code);
  
  const end = performance.now();
  console.log(`Timen taken ${(end - start).toFixed(7)}ms`);
  
  return jsCode;
}
