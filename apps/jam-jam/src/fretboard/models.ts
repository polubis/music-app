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
] as const; // Full octave in every instrument
export type NoteName = typeof NOTE_NAMES[number];
export interface Hideable {
  hidden?: boolean;
}

export interface Note {
  name: NoteName;
  position: number; // Represents value from 0 to 11
}

export interface Sound {
  note: Note;
}

export type GuitarSoundsTheme = Record<
  NoteName,
  { color: string; background: string }
>;

export interface GuitarSound extends Sound, Hideable {
  fret: number; // from 0 which means open string to n
}

export interface GuitarString extends Hideable {
  position: number;
  sounds: GuitarSound[];
}

export type GuitarTuning = NoteName[];

export type FretsMarkers = [number, number, number, number, number];

export const GUITAR_SCALES = ["Major"] as const;

export type Scale = {
  note: NoteName | null;
  scale: typeof GUITAR_SCALES[number] | null;
};
