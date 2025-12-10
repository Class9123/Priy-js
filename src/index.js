import { mount } from "priy";
import "./input.css";
import App from "./App.pri";
const start = performance.now()
const root = document.getElementById('root')


mount(App, root);

console.log("-----+--♥️------");
const end = performance.now();
console.log(`Timen taken To load ${(end - start).toFixed(7)}ms`);
