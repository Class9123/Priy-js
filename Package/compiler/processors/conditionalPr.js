import { getTagName } from "../helpers/index.js";
import BaseProcessor from "./baseModel.js";

export default class ConditionalProcessor extends BaseProcessor {

  process(ifNode, ifId, parentId, condition) {
    const placeholderId = this.uidGen.nextPlaceholder();
    const effectFn = this.uidGen.nextEffectFn();
    const currentBlock = this.uidGen.nextcurrentBlock();
    const prevCondition = this.uidGen.nextprevCondition();

    this.addCode(`
      const ${placeholderId} = _$._com();
      ${parentId}.appendChild(${placeholderId});
    `);

    this.addCode(`
      ${ifId}.renderChilds = () => {
        ${ifId}.innerHTML = "";
    `);
    for (const child of Array.from(ifNode.children)) {
      this.registry.processNode(child, ifId);
    }
    this.addCode(`};`);

    this.addCode(`
      let ${currentBlock} = ${placeholderId};
      let ${prevCondition};

      const ${effectFn} = () => {
        const _cond = ${condition};
        if (_cond !== ${prevCondition}) {
          const _toShow = _cond ? ${ifId} : ${placeholderId};
          if (_toShow.renderChilds) _toShow.renderChilds()
          ${currentBlock}.replaceWith(_toShow);
          ${currentBlock} = _toShow;
          ${prevCondition} = _cond;
        }
      };
      _$._reactive(${effectFn});
    `);
  }
}