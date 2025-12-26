import _$ from "priy/internal";
import {
  useEffect,
  useState,
  onMount
} from "priy";
import {
  motionValue,
  transform,
  animate,
  transformValue,
  styleEffect
} from "motion";

const motionProps = new Set([
  "initial", "animate", "whileHover", "whileTap", "transition"
]);

function createMotionLogic(el, props) {
  const {
    style,
    variants,
    initial,
    animate: animateDef,
    whileHover,
    whileTap,
    transition = {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  } = props;
  if (props.class) el.setAttribute("class", props.class)

  if (style) styleEffect(el, style)
  if (initial) {
    onMount(() => {
      animate(el, initial, {
        duration: 0
      })
    })
  }
  if (whileTap) {
    let ani;
    el.addEventListener("pointerdown", () => {
      animate(el, whileTap, transition)
    });
    const endTap = () => {
      animate(el, {
        scale: 1
      }, transition)
    };
    el.addEventListener("pointerup", endTap);
    el.addEventListener("pointerleave", endTap);
  }

}

function useTransform(mv, inputRange, outputRange) {
  return transformValue(() => transform(mv.get(), inputRange, outputRange));
}

export {
  motion,
  motionValue as useMotionValue,
  useTransform
};
const div = (props) => {
  const st = (el) => {
    createMotionLogic(el, props)
  }
  return <div {...simleProps} $ref={st}>
    <childs />
  </div>
}

const img = (props) => {
  const st = (el) => {
    createMotionLogic(el, props)
  }
  return <img $ref={st} src={props.src} />
}

const motion = {
  div,
  img
}