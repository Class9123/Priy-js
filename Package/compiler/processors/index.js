import { getType } from "../helpers/index.js";

import TextProcessor from "./textPr.js";
import RegularProcessor from "./regularPr.js";

class ProcessorRegistry {
  constructor() {
    this.processors = new Map();
    this.initDefaultProcessors();
  }

  reset(out, uidGen) {
    this.out = out;
    this.uidGen = uidGen;
    this.processors.get("Text").reset();
    this.processors.get("Node").reset();
  }

  initDefaultProcessors() {
    this.processors.set("Text", new TextProcessor(this));
    this.processors.set("Node", new RegularProcessor(this));
  }

  processNode(node, parentId, isComponentChild = false, isSvgChilds = false) {
    const type = getType(node);
    const processor = this.processors.get(type);

    if (processor) {
      return processor.process(
        node,
        parentId,
        false, // :--> isRoot
        isComponentChild,
        isSvgChilds
      );
    } else {
      console.warn(`No processor for type: ${type}`);
    }
  }

  makeCode(ast, rootId) {
    this.processors.get("Node").process(ast, rootId, true, false, false);
  }
}

const registry = new ProcessorRegistry();

export default function processAll(ast, out, uidGen, rootId) {
  registry.reset(out, uidGen);
  registry.makeCode(ast, rootId);
  return registry;
}
