import * as icons from "lucide";

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};

export default function Icon(props) {
  const {
    name,
    size,
    color,
    class: className,
    // 👈 canonical
    ...rest
  } = props;

  const icon = icons[name];
  if (!icon) {
    throw new Error(`[Icon] Unknown lucide icon: "${name}"`);
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  // 1️⃣ Apply lucide defaults
  for (const key in defaultAttributes) {
    svg.setAttribute(key, defaultAttributes[key]);
  }

  // 2️⃣ lucide-react-compatible props
  if (size != null) {
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
  }

  if (color != null) {
    svg.setAttribute("stroke", color);
  }

  // 3️⃣ class (Tailwind works)
  if (className) {
    svg.setAttribute("class", className);
  }

  // 4️⃣ Forward remaining props
  for (const key in rest) {
    if (rest[key] != null) {
      svg.setAttribute(key, rest[key]);
    }
  }

  // 5️⃣ Build SVG children
  for (const [tag, attrs] of icon) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const attr in attrs) {
      el.setAttribute(attr, attrs[attr]);
    }
    svg.appendChild(el);
  }

  return svg;
}