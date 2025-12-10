// stores variables used in multiple files
import { queueEffect } from "./core/dom.js";
let currentEffect = null;
function setCurrentEffect(effect) {
  currentEffect = effect;
}

const parentStack = [];
let pendingMounts = []; // stores { fn } temporarily

function withContext(parent, fn) {
  parentStack.push(parent);
  const result = fn();
  parentStack.pop();
  return result;
}

function currentParent() {
  return parentStack[parentStack.length - 1] || null;
}

// --- WeakMap for hooks ---
const mountMap = new Map(); // element -> [onMountFns]

// --- onMount registration ---
function onMount(fn) {
  // If element not yet known, queue it
  pendingMounts.push(fn);
}

// --- Mount logic ---
function mountComponent(Component, parent) {
  return withContext(parent, () => {
    const prev = [...pendingMounts];
    pendingMounts.length = 0;
    
    const el = Component();
    
    if (pendingMounts.length > 0 && el) {
      mountMap.set(el, pendingMounts);
    }
    
    if (parent && !parent.contains(el) && el) {
      parent.appendChild(el)
    }
    
    pendingMounts.forEach(fn => fn());
    
    pendingMounts = [...prev];

    return el;
  });
}

function mount(fn, parent) {
  mountComponent(fn, parent)
}

export {
  currentEffect,
  setCurrentEffect,
  queueEffect,
  onMount,
  mount,
  mountComponent,
  currentParent,
  mountMap
};
