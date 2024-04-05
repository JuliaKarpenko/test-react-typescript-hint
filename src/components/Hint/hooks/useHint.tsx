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

type Props = {
  ref: RefObject<HTMLElement>;
  hintContentRef: RefObject<HTMLDivElement>;
  side: Side;
};

export function useHint({ ref, hintContentRef, side }: Props) {
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
        hintContentRef?.current?.getBoundingClientRect().width || 0;
      const hintHeight =
        hintContentRef?.current?.getBoundingClientRect().height || 0;
      const middleWidth = left + width / 2 - hintWidth / 2;
      const middleHeight = top + height / 2 - hintHeight / 2;
      const offset = 8; // because we have top: -8px in the css class tooltip-container::before for an arrow
      const rightDistanceToScreenEnd = window.innerWidth - right;
      const bottomDistanceToScreenEnd = window.innerHeight - bottom;
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

      if (bottomDistanceToScreenEnd < hintHeight) {
        newCalculatedSide = "top";
      }

      if (top < hintHeight) {
        newCalculatedSide = "bottom";
      }

      setCalculatedSide(newCalculatedSide);

      switch (newCalculatedSide) {
        case "bottom":
          setPosition({
            top: bottom + offset,
            left: middleWidth,
            width,
          });
          break;
        case "top":
          setPosition({
            top: top - hintHeight - offset,
            left: middleWidth,
            width,
          });
          break;
        case "right":
          setPosition({
            left: right + offset,
            top: middleHeight,
            height,
          });
          break;
        case "left":
          setPosition({
            left: left - hintWidth - offset,
            top: middleHeight,
            height,
          });
          break;
        default:
          setPosition({});
          setCalculatedSide(undefined);
      }
    }
  }, [visible, ref, hintContentRef, side]);

  // to cache the function definition and avoid unnecessary re-renders
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
