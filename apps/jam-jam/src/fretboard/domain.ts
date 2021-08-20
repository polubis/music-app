export const SHARP_NOTES_NAMES = [
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
export const BMOLL_NOTES_NAMES = [
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
];

export type NoteNotation = "#" | "b";
export type SharpNoteName = typeof SHARP_NOTES_NAMES[number];
export type BmollNoteName = typeof BMOLL_NOTES_NAMES[number];
export interface Hideable {
  hidden?: boolean;
}

export interface Note {
  bmollName: BmollNoteName;
  sharpName: SharpNoteName;
  id: number;
}

export interface Sound {
  note: Note;
}

export interface GuitarSound extends Sound, Hideable {
  label: string;
  fret: number;
}

export interface GuitarString extends Hideable {
  id: number;
  sounds: GuitarSound[];
}

export type GuitarTuning = SharpNoteName[] | BmollNoteName[];
