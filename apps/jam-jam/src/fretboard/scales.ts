import { GuitarString, Scale } from "./models";

export const pickScaleInStrings = (
  strings: GuitarString[],
  scale: Scale
): GuitarString[] => {
  if (!scale.key || !scale.scale) return strings;
  const result: GuitarString[] = [];
  for (let i = 0; i < strings.length; i++) {
    const s: GuitarString = strings[i];
    s.sounds.forEach((sound) => {
      //f.e. its C Major scale array
      if (!["C", "D", "E", "F", "G", "A", "B"].includes(sound.note.name)) {
        sound.hidden = true;
      }
    });
    result.push(s);
  }

  return result;
};
