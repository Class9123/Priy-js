function isComponentTag(tag) {
  return /^[A-Z]/.test(tag);
}

function getTagName(node) {
  if (isElement(node)) return node.type;
  else throw new Error('getTagName Error: Unknown type of node');
}

function isElement(node) {
  return !node.type.startsWith('#');
}

function getText(node) {
  if (isText(node) || isJsx(node)) return node.nodeValue
  else throw new Error('getText Error: Unknown type of node');
}

function isText(node) {
  return node.type === "#text" ;
}

function isJsx(node) {
  return node.type === "#jsx";
}

function isSpread(node){
  return node.type === "#spread";
}

function getType(node) {
  let type ;
  if(isText(node) || isJsx(node) ) type ="Text"
  else if(isElement(node)) type="Node"
  return type;
}

export {
  getTagName,
  isElement,
  isText,
  isJsx,
  getType,
  getText,
  isComponentTag
};