import {
  GuitarSound,
  GuitarSoundsTheme,
  GuitarString,
  GuitarTuning,
  NoteName,
  NOTE_NAMES,
  Scale,
} from "./models";
import { major } from "./scales";

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

export const createFretsMarkers = (
  fretsCount: number,
  steps: number[]
): number[] => {
  const markers: number[] = [];
  let i = 0;
  let acc = 0;

  while (acc < fretsCount) {
    acc += steps[i];
    markers.push(acc);
    i = i === steps.length - 1 ? 0 : i + 1;
  }

  return markers.filter((marker) => marker <= fretsCount);
};

export const sliceStringSounds = (
  [from, to]: [number, number],
  sounds: GuitarSound[]
) => {
  return sounds.filter((_, idx) => idx >= from && idx <= to);
};

export const sliceSoundsInStrings = (
  range: [number, number],
  strings: GuitarString[]
): GuitarString[] => {
  return strings.map((string) => ({
    ...string,
    sounds: sliceStringSounds(range, string.sounds),
  }));
};

export const pickSounds = (
  names: NoteName[],
  sounds: GuitarSound[]
): GuitarSound[] => {
  return sounds.map((sound) => ({
    ...sound,
    hidden: sound.hidden ? sound.hidden : !names.includes(sound.note.name),
  }));
};

export const pickSoundsInStrings = (
  names: NoteName[],
  strings: GuitarString[]
): GuitarString[] => {
  return strings.map((string) => ({
    ...string,
    sounds: pickSounds(names, string.sounds),
  }));
};

export const createStrings = (
  tuning: GuitarTuning,
  frets: number,
  scale?: Scale | null
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
        hidden: false,
      });
      const nextAcc = acc + 1;
      acc = nextAcc > NOTE_NAMES.length - 1 ? 0 : nextAcc;
    }

    strings.push({ position: i, sounds, hidden: false });
  }

  if (scale?.note && scale.scale) {
    //we need to switch functions which generate guitar scales
    if (scale.note === "C" && scale.scale === "Major") {
      return major(strings, scale.note);
    }
  }

  return strings;
};

export const percentage = (value: number, percent: number): number =>
  (value * percent) / 100;
