import { NoteOctave, NotePosition } from "music-core";
import { Button, ButtonProps } from "antd";

import css from "./NoteButtonComponent.module.less";

export interface NoteButtonComponentProps {
  className?: string;
  position: NotePosition;
  octave?: NoteOctave;
  name: string;
  singleColor?: boolean;
  unavailable?: boolean;
  hidden?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const COLORS = [
  "#f08989",
  "#cc9d72",
  "#a4cc72",
  "#72cc76",
  "#72ccbc",
  "#72b1cc",
  "#729bcc",
  "#9a72cc",
  "#728bcc",
  "#7f72cc",
  "#c572cc",
  "#cc72a8",
] as const;

const NoteButtonComponent = ({
  className = "",
  position,
  name,
  octave,
  singleColor,
  hidden,
  unavailable,
  onClick,
}: NoteButtonComponentProps) => {
  const btnProps: ButtonProps = singleColor
    ? { type: "primary" }
    : { type: "primary", style: { background: COLORS[position] } };

  return (
    <Button
      className={`${css.btn} ${className} ${hidden ? css.hidden : ""} ${
        unavailable ? css.unavailable : ""
      }`}
      data-position={position}
      data-octave={octave}
      onClick={onClick}
      {...btnProps}
    >
      <span className={css.name}>{name}</span>
      {octave !== undefined && <span className={css.octave}>{octave}</span>}
    </Button>
  );
};

export { NoteButtonComponent };
