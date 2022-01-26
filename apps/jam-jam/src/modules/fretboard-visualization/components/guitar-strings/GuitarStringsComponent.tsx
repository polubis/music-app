import { memo } from "react";
import css from "./GuitarStringsComponent.module.less";

interface GuitarStringsComponentProps {
  amount: number;
  rotated?: boolean;
}

const GuitarStringsComponent = memo(
  ({ amount, rotated }: GuitarStringsComponentProps) => {
    return (
      <div className={`${css.strings} ${rotated ? css.rotated : ""}`}>
        {Array.from({ length: amount }).map((_, idx) => (
          <span key={idx} role="row" className={css.string} />
        ))}
      </div>
    );
  }
);

export { GuitarStringsComponent };
