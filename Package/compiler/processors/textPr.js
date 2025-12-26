import { getText, isJsx } from "../helpers/index.js";
import BaseProcessor from "./baseModel.js";

export default class TextProcessor extends BaseProcessor {
  process(node, parentId, _, isComponentTopChild) {
    const textId = this.uidGen.nextTextNode();
    const rawText = getText(node);
    const effectFn = this.uidGen.nextEffectFn();
    if (!rawText?.trim()) return;
    if (isJsx(node)) {
      this.addCode(`
        const ${textId} = _$._txt('');
        const ${effectFn} = () => {
          if (!${textId}.isConnected) return;
          ${textId}.data = ${rawText}
        };
        _$._reactive(${effectFn}, () => ${rawText} );
        ${textId}.data = ${rawText}
      
      `);
    } else {
      this.addCode(`
        const ${textId} = _$._txt(${JSON.stringify(rawText)});
        
      `);
    }
    if(isComponentTopChild){
      return textId 
    }
    this.addCode(`${parentId}.appendChild(${textId});`)
  }
}
