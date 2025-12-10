export default class BaseProcessor {
  constructor(registry) {
    this.registry = registry;
  }

  reset() {
    this.out = this.registry.out;
    this.uidGen = this.registry.uidGen;
  }

  addCode(code) {
    this.out.push(code);
  }

  process(node, parentId) {
    throw new Error("Must implement process method");
  }
}
