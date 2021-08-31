import { NoteNotation, SharpNoteNotation, BNoteNotation } from "./defs";

export const isSharpNotation = (
  notation: NoteNotation
): notation is SharpNoteNotation => notation === "#";

export const isBNotation = (
  notation: NoteNotation
): notation is BNoteNotation => notation === "b";
