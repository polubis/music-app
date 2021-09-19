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
  unactive?: boolean;
}

const NoteButton = ({
  className = "",
  style = {},
  notation,
  unactive,
  position,
  ...props
}: NoteButtonProps) => {
  return (
    <button
      {...props}
      className={`${css.btn} ${className} ${unactive ? css.unactive : ""}`}
      style={{
        ...style,
        ...(unactive ? {} : { background: NOTES_THEME[position] }),
      }}
    >
      {getNoteName(notation, position)}
    </button>
  );
};

export { NoteButton };
