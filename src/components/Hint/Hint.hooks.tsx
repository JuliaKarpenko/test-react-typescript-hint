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

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isVisible) {
      const { left, width, bottom, top, height, right } = ref.current.getBoundingClientRect();
      const tooltipWidth =
        tooltipRef?.current?.getBoundingClientRect().width || 0;
        const tooltipHeight =
        tooltipRef?.current?.getBoundingClientRect().height || 0;
      const middleWidth = left + width / 2 - tooltipWidth / 2;
      const middleHeight = top + height / 2 - tooltipHeight / 2;
      const verticalOffset = 12;
      let calculatedSide: Side = side;

      if (!calculatedSide) {
        calculatedSide = left < window.innerWidth / 2 ? "right" : "left";
      }

      if ( left < tooltipWidth) {
        calculatedSide = 'right'
      }

      console.log('left < tooltipWidth', left < tooltipWidth)

      if( calculatedSide === 'bottom') {
        setPosition({
          top: bottom + verticalOffset,
          left: middleWidth,
          width,
        });
      }
      if( calculatedSide === 'top') {
        setPosition({
          bottom: top + height + verticalOffset,
          left: middleWidth,
          width,
        });
      }
      if( calculatedSide === 'right') {
        setPosition({
          left: right + verticalOffset,
          top: middleHeight,
          height,
        });
      }
      if( calculatedSide === 'left') {
        setPosition({
          left: left - tooltipWidth - verticalOffset,
          top: middleHeight,
          height,
        });
      }

    } else {
      setPosition({});
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
  };
}
