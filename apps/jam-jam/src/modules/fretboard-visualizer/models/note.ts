import {
  NoteNotation,
  NotePosition,
  SHARP_NOTE_NAMES,
  B_NOTE_NAMES,
  LAST_NOTE_POSITION,
  BNoteName,
  SharpNoteName,
  NotesTheme,
  FIRST_NOTE_POSITION,
  NoteOctave,
  FIRST_NOTE_OCTAVE,
  LAST_NOTE_OCTAVE,
  NotesRange,
  MID_OCTAVE,
} from "./defs";
import { isBNotation, isSharpNotation } from "./notation";

type PickNoteNotation<T extends NoteNotation> = T extends NoteNotation.Sharp
  ? SharpNoteName
  : BNoteName;

export const DEFAULT_NUMBER_OF_NOTES = 24;
export const MIN_NOTES_COUNT = 1;
export const MAX_NOTES_COUNT = 27;
export const DEFAULT_NOTES_RANGE: NotesRange = [
  MIN_NOTES_COUNT,
  DEFAULT_NUMBER_OF_NOTES,
];

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

export const getOctavesFromPositions = (
  positions: NotePosition[]
): NoteOctave[] => {
  let octaves: NoteOctave[] = [];
  let currOctave: NoteOctave = MID_OCTAVE;

  for (let i = 0; i < positions.length; i++) {
    if (positions[i] < (positions[i - 1] || -1)) {
      currOctave = (currOctave + 1) as NoteOctave;
    }

    octaves.push(currOctave);
  }

  return octaves;
};
