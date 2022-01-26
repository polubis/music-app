export const POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
export const MIN_OCTAVE = OCTAVES[0];
export const MAX_OCTAVE = OCTAVES[OCTAVES.length - 1];
export const SHARP_NAMES = [
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
export const BMOLL_NAMES = [
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

export interface Cloneable<T> {
  clone: () => T;
}

export type NotePosition = typeof POSITIONS[number];
export type SharpNoteName = typeof SHARP_NAMES[number];
export type BmollNoteName = typeof BMOLL_NAMES[number];
export type NoteOctave = typeof OCTAVES[number];
export enum NoteNotationSymbol {
  Sharp = "#",
  Bmoll = "b",
}

export type NoteId = string | number;
export type NoteSymbol = NotePosition | SharpNoteName | BmollNoteName;
export interface Note {
  position: NotePosition;
  octave: NoteOctave;
  id: NoteId;
  sharpName: string;
  bmollName: string;
  symbol: NoteSymbol;
}

export enum StringInstrumentTuningType {
  Standard = "Standard",
  Drop = "Drop",
  Open = "Open",
  Alternate = "Alternate",
  Custom = "Custom",
}

export type StringInstrumentTuningId = string | number;

export interface StringInstrumentTuning {
  id: StringInstrumentTuningId;
  name: string;
  type: StringInstrumentTuningType;
  notes: Note[];
}

export type StringInstrumentHand = "left" | "right";

export interface StringInstrument extends Cloneable<StringInstrument> {
  notesCount: number;
  hand: StringInstrumentHand;
  tuning: StringInstrumentTuning;
  frets: Note[][];
  changeNotesCount: (notesCount: number) => StringInstrument;
  changeHand: (hand: StringInstrumentHand) => StringInstrument;
  changeTuning: (tuning: StringInstrumentTuning) => StringInstrument;
}

export interface StringInstrumentTuningsGroup {
  type: StringInstrumentTuningType;
  tunings: StringInstrumentTuning[];
}
