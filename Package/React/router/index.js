import internal from "../../internal.js";
import {
  useState
} from "../index.js";
import NotFound from "./notfoundPage.js";

const routes = new Map();
const cache = new Map();
let currentElem = null;
const [currentPath, setCurrentpath] = useState(null);
const scrollY = new Map();


function Route( {
  path, component
}) {
  routes.set(path, component);
  return null;
}


function Router( {
  default: Def, children
  }) {
  children.forEach(fn => {
    if (typeof fn === "function") fn();
  });

  let initialRoute = Def ? Def: normalize(window.location.pathname);
  setCurrentpath(initialRoute);
  // Popstate → handle back/forward navigation
  window.addEventListener("popstate",
    () => {
      const path = normalize(window.location.pathname);
      render(path);
    });

  // Scroll restoration on page reload/back/forward
  window.addEventListener("touchend",
    () => {
      scrollY.set("scroll:" + currentPath(), String(window.scrollY));
    });

  let component = routes.get(initialRoute);
  if (!component) component = () => NotFound( {
    path: currentPath
  });
  currentElem = component();
  cache.set(initialRoute, currentElem);
  return currentElem;
}


  function push(path) {
    const norm = normalize(path);
    if (norm === currentPath()) {
      console.warn("same route");
      return;
    }
    history.pushState({
      path: norm
    }, "", norm);
    render(norm);
  }

  function replace(path) {
    const norm = normalize(path);
    if (norm === currentPath()) {
      console.warn("same route");
      return;
    }
    history.replaceState({
      path: norm
    }, "", norm);
    render(norm);
  }


  function render(path) {
    const cleanPath = normalize(path);
    let component = routes.get(cleanPath);
    let newElem;
    if (component) {
      if (cache.get(path)) {
        newElem = cache.get(path);
      } else {
        newElem = internal.mountComponent(component, null);
        cache.set(path, newElem);
      }
    } else {
      newElem = internal.mountComponent(
        () => NotFound( {
          path: currentPath
        }),
        null
      );
    }
    if (currentElem) currentElem.replaceWith(newElem);
    setCurrentpath(path);
    currentElem = newElem;

    const y = Number(scrollY.get("scroll:" + cleanPath));
    window.scrollTo(0, y ? Number(y): 0);
  }


  function Link(props) {
    const el = internal._el("a");
    props.class && el.setAttribute("class", props.class);
    if (props.children)
      props.children.forEach(child => {
      if (typeof child === "function") internal.mountComponent(child, el);
      else el.appendChild(child);
    });

    el.addEventListener("click",
      e => {
        e.preventDefault();
        if (props.rep) replace(props.href);
        else push(props.href);
      });

    return el;
  }



  function normalize(path) {
    return path.startsWith("/") ? path: `/${path}`;
  }

  export {
    Router,
    Route,
    push,
    replace,
    Link,
    currentPath as path
  };


  export function Childs(props) {
    const children = props.children
    const fr = internal._fr()
    children.forEach(c => fr.appendChild(c))
    return fr;
  }