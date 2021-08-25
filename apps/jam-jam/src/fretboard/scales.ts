import { GuitarString, NoteName } from "./models";

type ScalePattern = {
  [key in NoteName]: string[];
};

const MAJOR: ScalePattern = {
  C: ["E", "F", "", "G", "", "A", "", "B", "C", "", "D", ""],
  "C#": [],
  D: [],
  "D#": [],
  E: [],
  F: [],
  "F#": [],
  G: [],
  "G#": [],
  A: [],
  "A#": [],
  B: [],
};

export const major = (strings: GuitarString[], noteName: NoteName) => {
  const result: GuitarString[] = [];
  for (let i = 0; i < strings.length; i++) {
    const s: GuitarString = strings[i];
    const note: string = s.sounds[0].note.name;
    const index = MAJOR[noteName].findIndex((e: string) => e === note);
    let pattern = [
      ...MAJOR[noteName].slice(index),
      ...MAJOR[noteName].slice(0, index),
    ];
    pattern = [...pattern, ...pattern, ...pattern];
    s.sounds.forEach((sound, index) => {
      if (!pattern[index]) {
        sound.hidden = true;
      }
    });
    result.push(s);
  }

  return result;
};
