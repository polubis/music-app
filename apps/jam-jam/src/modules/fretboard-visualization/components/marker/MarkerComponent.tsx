import { memo } from "react";
import css from "./MarkerComponent.module.less";

interface MarkerComponentProps {
  fret: number;
}

export const MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24].reduce<
  Record<number, boolean>
>((acc, marker) => ({ ...acc, [marker]: true }), {});

const MarkerComponent = memo(
  ({ fret }: MarkerComponentProps) => {
    if (!MARKERS[fret]) {
      return null;
    }

    return (
      <div className={`${css.marker} ${fret % 12 === 0 ? css.halfMarker : ""}`}>
        {fret}
      </div>
    );
  },
  () => true
);

export { MarkerComponent };
