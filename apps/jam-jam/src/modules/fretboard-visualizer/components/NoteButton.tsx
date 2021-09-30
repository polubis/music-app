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
  ghosty?: boolean;
}

const NoteButton = ({
  className = "",
  style = {},
  notation,
  uncolored,
  ghosty,
  position,
  ...props
}: NoteButtonProps) => {
  return (
    <button
      {...props}
      className={`${css.btn} ${className} ${uncolored ? css.uncolored : ""} ${
        ghosty ? css.ghosty : ""
      }`}
      style={{
        ...style,
        ...(uncolored ? {} : { background: NOTES_THEME[position] }),
      }}
    >
      {getNoteName(notation, position)}
    </button>
  );
};

export { NoteButton };
