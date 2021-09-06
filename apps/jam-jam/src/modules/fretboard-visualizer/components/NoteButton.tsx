import React from "react";

import {
  NotePosition,
  NoteNotation,
  getNoteName,
  NOTES_THEME,
} from "../models";

import css from "./NoteButton.scss";

interface NoteButtonProps {
  position: NotePosition;
  notation: NoteNotation;
}

const NoteButton = ({ notation, position }: NoteButtonProps) => {
  return (
    <button className={css.btn} style={{ background: NOTES_THEME[position] }}>
      {getNoteName(notation, position)}
    </button>
  );
};

export { NoteButton };
