import fs from "fs";
import beautify from "js-beautify";
import path from "path";
import compilePriToJs from "../utils/jsxTransform.js"


export default function scanComponent(filePath) {
  const start = performance.now();
  const code = fs.readFileSync(filePath, "utf-8");
 // console.log("\nTransforming file ", filePath, "\n");
  const script = compilePriToJs(code);

  const end = performance.now();
  //console.log(`Timen taken ${(end - start).toFixed(7)}ms`);

  return {
    script
  };
}