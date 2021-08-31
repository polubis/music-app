import {
  GuitarSound,
  GuitarSoundsTheme,
  GuitarString,
  GuitarTuning,
  NoteName,
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

export const TUNINGS: GuitarTuning[] = [
  {
    name: "E standard",
    notes: ["E", "B", "G", "D", "A", "E"],
  },
  {
    name: "Drop D",
    notes: ["D", "A", "D", "G", "B", "E"],
  },
  {
    name: "Double Drop D",
    notes: ["D", "A", "D", "G", "B", "D"],
  },
  {
    name: "DADGAD",
    notes: ["D", "A", "D", "G", "A", "D"],
  },
  {
    name: "Open D",
    notes: ["D", "A", "D", "F#", "A", "D"],
  },
  {
    name: "Open E",
    notes: ["E", "B", "E", "G#", "B", "E"],
  },
  {
    name: "Open G",
    notes: ["D", "G", "D", "G", "B", "D"],
  },
  {
    name: "Open A",
    notes: ["E", "A", "E", "A", "C#", "E"],
  },
  {
    name: "DGC-GCD",
    notes: ["D", "G", "C", "G", "C", "D"],
  },
  {
    name: "Open C6",
    notes: ["C", "A", "C", "G", "C", "E"],
  },
  {
    name: "Open C",
    notes: ["C", "G", "C", "G", "G", "E"],
  },
  {
    name: "EEEEBE",
    notes: ["E", "E", "E", "E", "B", "E"],
  },
];

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
    hidden: !names.includes(sound.note.name),
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
  notes: NoteName[],
  frets: number
): GuitarString[] => {
  const strings: GuitarString[] = [];

  for (let i = 0; i < notes.length; i++) {
    const sound = notes[i];
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

  return strings;
};

export const percentage = (value: number, percent: number): number =>
  (value * percent) / 100;
