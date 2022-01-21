import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

import {
  NotePosition,
  NoteNotation,
  getNoteName,
  NOTES_THEME,
} from "../models";

import css from "./NoteButton.module.less";

interface NoteButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "children"
  > {
  position: NotePosition;
  notation: NoteNotation;
  uncolored?: boolean;
  unclickable?: boolean;
  ghosty?: boolean;
  octave?: number;
}

const NoteButton = ({
  className = "",
  style = {},
  notation,
  uncolored,
  ghosty,
  octave,
  position,
  unclickable,
  ...props
}: NoteButtonProps) => {
  return (
    <button
      {...props}
      className={`${css.btn} ${className} ${uncolored ? css.uncolored : ""} ${
        ghosty ? css.ghosty : ""
      } ${unclickable ? css.unclickable : ""}`}
      style={{
        ...style,
        ...(uncolored ? {} : { background: NOTES_THEME[position] }),
      }}
    >
      <span className={css.name}>{getNoteName(notation, position)}</span>
      {octave !== undefined && <span className={css.octave}>{octave}</span>}
    </button>
  );
};

export { NoteButton };
