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
       const ${frId} = _$._fr()
      `);

    node.children.forEach(childNode => {
      this.registry.processNode(childNode, frId);
    });
    this.addCode(`
    return ${frId}
}
const ${mapId} = new Map()
const ${effectFn} = (configuration=null) => {
  if (!configuration) return
  const data = ${source}
  const index = configuration.index
  if (configuration.push) {
    const node = ${createChildren}(data[index], index)
    ${elemId}.appendChild(node)
    ${mapId}.set(index, node)
  } else if (configuration.setAt){
    const node = ${createChildren}(data[index], index)
    ${mapId}.get(index).replaceWith(node)
    ${mapId}.set(index, node)
  }else if (configuration.remove){
    ${mapId}.get(index).remove()
    ${mapId}.set(index, undefined)
  }
  
}

  ${source}.forEach((_$local,index) => {
    const node = ${createChildren}(_$local, index)
    ${elemId}.appendChild(node)
    ${mapId}.set(index, node)
  })
  _$._reactive(${effectFn}, () => ${source})
  ${parentId}.appendChild(${elemId})
    `);
  }
}

/*
// Keep a map of key -> DOM node
let keyedNodes = new Map();

const _$effectFn0 = () => {
    const data = todos();
    const newMap = new Map();

    let lastNode = null;

    data.forEach(todo => {
        let node = keyedNodes.get(todo.id);

        // If no existing node, create one
        if (!node) {
            const _$ement2 = _$._("p");

            const _$textNode0 = _$._txt('');
            const _$effectFn1 = () => {
                if (!_$textNode0.isConnected) return;
                _$textNode0.data = `id :${todo.id} and text is ${todo.text} and status is ${todo.completed}`;
            };
            _$._reactive(_$effectFn1, () => `id :${todo.id} and text is ${todo.text} and status is ${todo.completed}`);
            _$textNode0.data = `id :${todo.id} and text is ${todo.text} and status is ${todo.completed}`;

            _$element2.appendChild(_$textNode0);
            node = _$element2;
        }

        // Insert/move node in the right place
        if (lastNode === null) {
            // Insert at the beginning
            if (_$element1.firstChild !== node) {
                _$element1.insertBefore(node, _$element1.firstChild);
            }
        } else {
            if (lastNode.nextSibling !== node) {
                _$element1.insertBefore(node, lastNode.nextSibling);
            }
        }

        lastNode = node;
        newMap.set(todo.id, node);
    });

    // Remove any old nodes that aren’t in the new list
    keyedNodes.forEach((node, key) => {
        if (!newMap.has(key)) {
            node.remove();
        }
    });

    // Replace with new map for next update
    keyedNodes = newMap;
};

*/
