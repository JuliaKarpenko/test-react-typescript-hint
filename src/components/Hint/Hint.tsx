import React, { FC, useEffect, useRef } from "react";
import { useHint } from "./hooks/useHint";
import "./Hint.css";
import { Side } from "./hooks/useHint";

type Props = {
  hintContent: React.ReactNode;
  children: React.ReactNode;
  side: Side;
  className?: string;
};

const Hint: FC<Props> = ({ hintContent, side, children, className }) => {
  const hintContainerRef = useRef<HTMLDivElement>(null);
  const hintContentRef = useRef<HTMLDivElement>(null);

  const { position, visible, onMouseOver, onMouseOut, calculatedSide } =
    useHint({
      ref: hintContainerRef,
      hintContentRef,
      side,
    });

  useEffect(() => {
    const element = hintContainerRef?.current;

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
  }, []);

  return (
    <div className={className} ref={hintContainerRef}>
      <div >{children}</div>
      {visible && (
        <div
          ref={hintContentRef}
          className={`hint-container hint-container--${calculatedSide}`}
          style={{
            top: position.top,
            right: position.right,
            bottom: position.bottom,
            left: position.left,
          }}
        >
          {hintContent}
        </div>
      )}
    </div>
  );
};

export default Hint;
