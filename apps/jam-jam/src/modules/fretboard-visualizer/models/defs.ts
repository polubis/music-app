export const SHARP_NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export const B_NOTE_NAMES = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
] as const;

export const NOTES_POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export const FIRST_NOTE_POSITION = NOTES_POSITIONS[0];
export const LAST_NOTE_POSITION = NOTES_POSITIONS[NOTES_POSITIONS.length - 1];

export const NOTES_OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
export const FIRST_NOTE_OCTAVE = NOTES_OCTAVES[0];
export const LAST_NOTE_OCTAVE = NOTES_OCTAVES[NOTES_OCTAVES.length - 1];

export enum NoteNotation {
  Sharp = "#",
  Bmoll = "b",
}

export type SharpNoteName = typeof SHARP_NOTE_NAMES[number];
export type BNoteName = typeof B_NOTE_NAMES[number];
export type NoteName = SharpNoteName | BNoteName;
export type NoteOctave = typeof NOTES_OCTAVES[number];

export interface Hideable {
  hidden?: boolean;
}

export interface Identified {
  id: number;
}

export type NotePosition = typeof NOTES_POSITIONS[number];

export interface Note extends Identified, Hideable {
  octave: number; // 0 - 7 - 8 octaves on piano
  name: NoteName; // C - B or second notation
  position: NotePosition; // 0 - 11 - 12 notes
  notation: NoteNotation;
}

export interface GuitarString extends Hideable, Identified {
  notes: Note[];
}

export type NoteTheme = string;

export type NotesTheme = [
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme,
  NoteTheme
];

export interface GuitarStringTuning extends Identified {
  octave: NoteOctave;
  position: NotePosition;
}

export enum GuitarOrientation {
  Left = "left",
  Right = "right",
}

export type NotesRange = [number, number];

export interface GuitarStringsFilters {
  orientation: GuitarOrientation;
  notation: NoteNotation;
  hiddenPositions: NotePosition[];
  notesCount: number;
  notesRange: NotesRange;
  tuning: GuitarStringTuning[];
}

export enum TuningCategory {
  Open = "Open",
  Drop = "Drop",
  Standard = "Standard",
  Alternate = "Alternate",
}

export interface DescribedGuitarStringTuning {
  name: string;
  category: TuningCategory;
  tuning: GuitarStringTuning[];
}

export type GroupedDescribedGuitarTunings = Record<
  TuningCategory,
  DescribedGuitarStringTuning[]
>;
