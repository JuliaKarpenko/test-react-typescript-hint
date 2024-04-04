import React, { FC, useEffect, useRef } from "react";
import { useHint } from "./Hint.hooks";
import "./Hint.css";
import { Side } from "./Hint.hooks";

type HintProps = {
  hintLabel: React.ReactNode;
  hintElement: React.ReactNode;
  side: Side;
};

const Hint: FC<HintProps> = ({ hintLabel, side, hintElement }) => {
  const hintLabelRef = useRef<HTMLDivElement>(null);
  const hintContainerRef = useRef<HTMLDivElement>(null);

  const { position, visible, onMouseOver, onMouseOut, calculatedSide } =
    useHint({
      ref: hintContainerRef,
      hintLabelRef,
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
  }, [onMouseOver, onMouseOut]);

  return (
    <div ref={hintContainerRef}>
      <div>{hintElement}</div>
      {visible && (
        <>
          <div
            ref={hintLabelRef}
            className={`hint-container hint-container--${calculatedSide}`}
            style={{
              top: position.top,
              left: position.left,
              bottom: position.bottom,
              right: position.right,
            }}
          >
            {hintLabel}
          </div>
        </>
      )}
    </div>
  );
};

export default Hint;
