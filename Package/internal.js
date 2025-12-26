import {
  mountComponent,
  currentParent,
  setCurrentEffect,
  mountMap
} from "./React/globals.js";

const svgNS = "http://www.w3.org/2000/svg";

function _com() {
  return document.createComment("Something");
}
function _el(tag) {
  return document.createElement(tag);
}
function _elNs(tag) {
  return document.createElementNS(svgNS, tag);
}
function _txt(str) {
  return document.createTextNode(str);
}

function _fr() {
  return document.createDocumentFragment();
}

function _reactive(fn, exp = null) {
  const effect = {
    fn: fn,
    cleanup: null
  };
  setCurrentEffect(effect);
  effect.fn();
  if (exp) exp();
  setCurrentEffect(null);
}

function _appendTo(parent, child) {
  parent.appendChild(child);
}

function _wrapProps(props) {
  const proxy = new Proxy(props, {
    get(target, key) {
      const vl = target[key];
      if (typeof vl !== "function") {
        return () => vl;
      } else {
        return vl;
      }
    },
    set() {
      throw new Error("cannot set props ");
    }
  });
  return proxy;
}

export default {
  _el,
  _elNs,
  _reactive,
  _txt,
  _com,
  _fr,
  _appendTo,
  _wrapProps,
  mountComponent,
  currentParent,
  mountMap
};
