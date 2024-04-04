import { RefObject, useCallback, useEffect, useState } from "react";

export type Side = "top" | "bottom" | "left" | "right";

type Position = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  bottom?: number;
  right?: number;
};

type UseHintProps = {
  ref: RefObject<HTMLElement>;
  hintLabelRef: RefObject<HTMLDivElement>;
  side: Side;
};

export function useHint({ ref, hintLabelRef, side }: UseHintProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({});
  const [calculatedSide, setCalculatedSide] = useState<Side | undefined>(side);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (visible) {
      const { left, width, bottom, top, height, right } =
        ref.current.getBoundingClientRect();
      const hintWidth =
        hintLabelRef?.current?.getBoundingClientRect().width || 0;
      const hintHeight =
        hintLabelRef?.current?.getBoundingClientRect().height || 0;
      const middleWidth = left + width / 2 - hintWidth / 2;
      const middleHeight = top + height / 2 - hintHeight / 2;
      const verticalOffset = 12;
      const rightDistanceToScreenEnd = window.innerWidth - right;
      let newCalculatedSide: Side | undefined = side;

      if (!newCalculatedSide) {
        newCalculatedSide = left < window.innerWidth / 2 ? "right" : "left";
      }

      if (left < hintWidth) {
        newCalculatedSide = "right";
      }

      if (rightDistanceToScreenEnd < hintWidth) {
        newCalculatedSide = "left";
      }

      setCalculatedSide(newCalculatedSide);

      if (newCalculatedSide === "bottom") {
        setPosition({
          top: bottom + verticalOffset,
          left: middleWidth,
          width,
        });
      } else if (newCalculatedSide === "top") {
        setPosition({
          bottom: top + height + verticalOffset,
          left: middleWidth,
          width,
        });
      } else if (newCalculatedSide === "right") {
        setPosition({
          left: right + verticalOffset,
          top: middleHeight,
          height,
        });
      } else if (newCalculatedSide === "left") {
        setPosition({
          left: left - hintWidth - verticalOffset,
          top: middleHeight,
          height,
        });
      }
    } else {
      setPosition({});
      setCalculatedSide(undefined);
    }
  }, [visible, ref, hintLabelRef, side]);

  const onMouseOver = useCallback(() => {
    setVisible(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    position,
    visible,
    onMouseOver,
    onMouseOut,
    calculatedSide,
  };
}
