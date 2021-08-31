import {
  NoteNotation,
  NotePosition,
  SHARP_NOTE_NAMES,
  B_NOTE_NAMES,
  LAST_NOTE_POSITION,
  SharpNoteNotation,
  BNoteName,
  SharpNoteName,
  NotesTheme,
  FIRST_NOTE_POSITION,
  NoteOctave,
  FIRST_NOTE_OCTAVE,
  LAST_NOTE_OCTAVE,
} from "./defs";
import { isBNotation, isSharpNotation } from "./notation";

type PickNoteNotation<T extends NoteNotation> = T extends SharpNoteNotation
  ? SharpNoteName
  : BNoteName;

export const isNotePosition = (position: number): position is NotePosition =>
  position >= FIRST_NOTE_POSITION && position <= LAST_NOTE_POSITION;

export const isNoteOctave = (octave: number): octave is NoteOctave =>
  octave >= FIRST_NOTE_OCTAVE && octave <= LAST_NOTE_OCTAVE;

export const getNoteName = <T extends NoteNotation>(
  notation: T,
  position: NotePosition
): PickNoteNotation<T> => {
  if (isSharpNotation(notation)) {
    return SHARP_NOTE_NAMES[position] as PickNoteNotation<T>;
  }

  if (isBNotation(notation)) {
    return B_NOTE_NAMES[position] as PickNoteNotation<T>;
  }

  throw new Error("getNoteName() [UNSUPPORTED_NOTE_NOTATION]");
};

export const NOTES_THEME: NotesTheme = [
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
];