import { NoteNotation } from "./defs";

export const isSharpNotation = (notation: NoteNotation): boolean =>
  notation === NoteNotation.Sharp;

export const isBNotation = (notation: NoteNotation): boolean =>
  notation === NoteNotation.Bmoll;

export const getOppositeNotation = (notation: NoteNotation): NoteNotation =>
  isBNotation(notation) ? NoteNotation.Sharp : NoteNotation.Bmoll;
