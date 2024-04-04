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

type UseTooltipProps = {
  ref: RefObject<HTMLElement>;
  tooltipRef: RefObject<HTMLDivElement>;
  side: Side;
};

export function useTooltip({ ref, tooltipRef, side }: UseTooltipProps) {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({});
  const [calculatedSide, setCalculatedSide] = useState<Side | undefined>(side);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isVisible) {
      const { left, width, bottom, top, height, right } =
        ref.current.getBoundingClientRect();
      const tooltipWidth =
        tooltipRef?.current?.getBoundingClientRect().width || 0;
      const tooltipHeight =
        tooltipRef?.current?.getBoundingClientRect().height || 0;
      const middleWidth = left + width / 2 - tooltipWidth / 2;
      const middleHeight = top + height / 2 - tooltipHeight / 2;
      const verticalOffset = 12;
      const rightDistanceToScreenEnd = window.innerWidth - right;
      let newCalculatedSide: Side | undefined = side;

      if (!newCalculatedSide) {
        newCalculatedSide = left < window.innerWidth / 2 ? "right" : "left";
      }

      if (left < tooltipWidth) {
        newCalculatedSide = "right";
      }

      if (rightDistanceToScreenEnd < tooltipWidth) {
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
          left: left - tooltipWidth - verticalOffset,
          top: middleHeight,
          height,
        });
      }
    } else {
      setPosition({});
      setCalculatedSide(undefined);
    }
  }, [isVisible, ref, tooltipRef, side]);

  const onMouseOver = useCallback(() => {
    setVisible(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    position,
    isVisible,
    onMouseOver,
    onMouseOut,
    calculatedSide,
  };
}
