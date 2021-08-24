import {
  FretsMarkers,
  GuitarSound,
  GuitarSoundsTheme,
  GuitarString,
  GuitarTuning,
  NOTE_NAMES,
} from "./models";

export const DEFAULT_THEME: GuitarSoundsTheme = {
  C: { color: "#ffffff", background: "#002766" },
  "C#": { color: "#ffffff", background: "#003a8c" },
  D: { color: "#ffffff", background: "#002329" },
  "D#": { color: "#ffffff", background: "#00474f" },
  E: { color: "#ffffff", background: "#092b00" },
  F: { color: "#ffffff", background: "#520339" },
  "F#": { color: "#ffffff", background: "#780650" },
  G: { color: "#ffffff", background: "#120338" },
  "G#": { color: "#ffffff", background: "#22075e" },
  A: { color: "#ffffff", background: "#610b00" },
  "A#": { color: "#ffffff", background: "#871400" },
  B: { color: "#ffffff", background: "#612500" },
};

export const DEFAULT_FRETS_MARKERS: FretsMarkers = [3, 5, 7, 9, 12];

export const increaseFretsMarkers = (
  fretsCount: number,
  fretsMarkers: FretsMarkers
): number[] => {
  const cycles = Math.ceil(fretsCount / NOTE_NAMES.length);
  const markers: number[] = [];
  let acc = 0;

  for (let i = 0; i < cycles; i++) {
    for (let j = 0; j < fretsMarkers.length; j++) {
      markers.push(fretsMarkers[j] + acc);

      if (j === fretsMarkers.length - 1) {
        acc += NOTE_NAMES.length;
      }
    }
  }

  return markers;
};

export const createStrings = (
  tuning: GuitarTuning,
  frets: number
): GuitarString[] => {
  const strings: GuitarString[] = [];

  for (let i = 0; i < tuning.length; i++) {
    const sound = tuning[i];
    let acc = NOTE_NAMES.findIndex((currSound) => currSound === sound);
    const sounds: GuitarSound[] = [];

    for (let j = 0; j <= frets; j++) {
      sounds.push({
        fret: j,
        note: {
          name: NOTE_NAMES[acc],
          position: acc,
        },
      });
      const nextAcc = acc + 1;
      acc = nextAcc > NOTE_NAMES.length - 1 ? 0 : nextAcc;
    }

    strings.push({ position: i, sounds });
  }

  return strings;
};

export const percentage = (value: number, percent: number): number =>
  (value * percent) / 100;
