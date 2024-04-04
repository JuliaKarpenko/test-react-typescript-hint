import React, { FC, RefObject, useEffect, useRef } from "react";
import { useTooltip } from "./Hint.hooks";
import "./Hint.css";
import { Side } from './Hint.hooks';

type TooltipProps = {
  elementRef: RefObject<HTMLElement>;
  children: React.ReactNode;
  side: Side
};

const Hint: FC<TooltipProps> = ({ children, elementRef, side }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const {
    position,
    isVisible,
    onMouseOver,
    onMouseOut,
    calculatedSide,
  } = useTooltip({
    ref: elementRef,
    tooltipRef,
    side,
  });

  useEffect(() => {
    const element = elementRef?.current;

    if (element) {
      element.addEventListener("mouseenter", onMouseOver);
      element.addEventListener("mouseleave", onMouseOut);
    }

    // cleans up event listeners by removing them when the component is unmounted
    return () => {
      if (element) {
        element.removeEventListener("mouseenter", onMouseOver);
        element.removeEventListener("mouseleave", onMouseOut);
      }
    };
  }, [elementRef, onMouseOver, onMouseOut]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className={`hint-container hint-container--${calculatedSide}`} // adding className here for later use
      style={{
        top: position.top,
        left: position.left,
        bottom: position.bottom,
        right: position.right,
      }}
    >
      {children}
    </div>
  );
};

export default Hint;