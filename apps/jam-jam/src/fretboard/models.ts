export const NOTE_NAMES = [
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
export type NoteName = typeof NOTE_NAMES[number];
export interface Hideable {
  hidden?: boolean;
}

export interface Note {
  name: NoteName;
  position: number;
}

export interface Sound {
  note: Note;
}

export interface GuitarSoundTheme {
  background: string;
  color: string;
}

export interface GuitarSound extends Sound, Hideable {
  fret: number;
  theme: GuitarSoundTheme;
}

export interface GuitarString extends Hideable {
  position: number;
  sounds: GuitarSound[];
}

export type GuitarTuning = NoteName[];
