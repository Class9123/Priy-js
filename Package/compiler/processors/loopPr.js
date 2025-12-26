import { getTagName } from "../helpers/index.js";
import BaseProcessor from "./baseModel.js";

export default class LoopProcessor extends BaseProcessor {
  process(node, elemId, parentId, val) {
    const [local, source] = val.split(" in ").map(s => s.trim());
    const frId = this.uidGen.nextFragment();
    const mapId = this.uidGen.nextVariable();
    const effectFn = this.uidGen.nextEffectFn();
    const createChildren = this.uidGen.nextEffectFn();

    this.addCode(`function ${createChildren}(${local}) {
      `);
      let id ;
    node.children.forEach(childNode => {
      const r = this.registry.processNode(childNode, null );
      if (r) id = r
    });
    this.addCode(`
    return ${id}
}
const ${mapId} = []
${source}.forEach((_$local,index) => {
  const node = ${createChildren}(_$local, index)
  ${elemId}.appendChild(node)
  ${mapId}.push(node)
})


const ${effectFn} = (configuration=null) => {
  if (!configuration) return
  const data = ${source}
  const index = configuration.index
  if (configuration.push) {
    const node = ${createChildren}(data[index], index)
    ${elemId}.appendChild(node)
    ${mapId}.push(node)
  } else if (configuration.setAt){
    const node = ${createChildren}(data[index], index)
    ${mapId}[index].replaceWith(node)
    ${mapId}[index] = node
  }else if (configuration.remove){
    ${mapId}[index].remove()
    ${mapId}.splice(index, 1)
  }
  
}

  
  _$._reactive(${effectFn}, () => ${source})
  
  ${parentId}.appendChild(${elemId})
  
    `);
  }
}