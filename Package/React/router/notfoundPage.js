import internal from "../../internal.js";
import useEffect from "../core/effect.js";
const wrapper = document.createElement("div");
wrapper.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #111827, #1f2937, #111827);
    color: white;
    padding: 1.5rem;
    text-align: center;
    font-family: system-ui, sans-serif;
  `;

const title = document.createElement("h1");
title.textContent = "404";
title.style.cssText = `
    font-size: 5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    animation: pulse 2s infinite;
  `;

const subtitle = document.createElement("h2");
subtitle.style.cssText = `
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    width: 85vw;
    text-align:center;
    word-break:break-word;
  `;

const message = document.createElement("p");
message.textContent =
  "Oops! The page you’re looking for doesn’t exist or has been moved.";
message.style.cssText = `
    color: #9ca3af;
    max-width: 500px;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  `;

const button = document.createElement("button");
button.textContent = "Go Home";
button.style.cssText = `
    background-color: #4f46e5;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
  `;

button.onmouseenter = () => {
  button.style.backgroundColor = "#6366f1";
  button.style.transform = "translateY(-2px)";
};
button.onmouseleave = () => {
  button.style.backgroundColor = "#4f46e5";
  button.style.transform = "translateY(0)";
};

// Add a simple pulse animation for 404
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
document.head.appendChild(style);

wrapper.append(title, subtitle, message);

const component = ({ path }) => {
  useEffect(() => {
    subtitle.textContent = path() + " Not Found";
  });
  return wrapper;
};
export default component;
