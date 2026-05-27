import React from "react";

function cleanMotionProps(props) {
  const {
    initial,
    animate,
    exit,
    transition,
    whileHover,
    whileTap,
    whileInView,
    viewport,
    layoutId,
    ...rest
  } = props;
  return rest;
}

function createMotionTag(Tag) {
  return React.forwardRef(function MotionTag(props, ref) {
    return <Tag ref={ref} {...cleanMotionProps(props)} />;
  });
}

export const motion = {
  div: createMotionTag("div"),
  section: createMotionTag("section"),
  span: createMotionTag("span"),
  p: createMotionTag("p")
};

export function AnimatePresence({ children }) {
  return <>{children}</>;
}
