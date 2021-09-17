import {
  NotePosition,
  Scale,
  NOTES_POSITIONS,
  LAST_NOTE_POSITION,
  ScaleType,
  KeyedScale,
  ScaleInterval,
} from "./defs";
import { isNotePosition } from "./note";

const createScale = (
  pattern: ScaleInterval[],
  type: ScaleType,
  modesNames: string[]
): Scale => {
  return {
    type,
    pattern,
    modes: modesNames.map((name, idx) => ({
      name,
      pattern: idx === 0 ? [...pattern] : pattern.slice(idx, pattern.length),
    })),
  };
};

export const SCALES: Scale[] = [
  createScale([2, 2, 1, 2, 2, 2, 1], ScaleType.Major, []),
  createScale([2, 1, 2, 2, 2, 2, 1], ScaleType.MelodicMinor, []),
  createScale([2, 1, 2, 2, 1, 3, 1], ScaleType.HarmonicMinor, []),
  createScale([2, 2, 1, 2, 1, 3, 1], ScaleType.HarmonicMajor, []),
  createScale([2, 1, 2, 1, 2, 1, 2, 1], ScaleType.Diminished, []),
  createScale([2, 1, 2, 1, 2, 1, 2, 1], ScaleType.WholeTone, []),
  createScale([3, 1, 3, 1, 3, 1], ScaleType.Augmented, []),
];

export const createKeyedScale = (
  key: NotePosition,
  { pattern, type }: Scale
): KeyedScale => {
  const foundPositionIdx = NOTES_POSITIONS.findIndex(
    (position) => position === key
  );

  if (foundPositionIdx === -1) {
    throw new Error("createScale() [CANNOT_FIND_POSITION]");
  }

  const positions: NotePosition[] = [key];
  let currPosition = key;

  for (let i = 0; i < pattern.length; i++) {
    const nextPosition = currPosition + pattern[i];

    currPosition = isNotePosition(nextPosition)
      ? nextPosition
      : ((nextPosition - LAST_NOTE_POSITION - 1) as NotePosition);

    positions.push(currPosition);
  }

  return {
    pattern,
    key,
    type,
    positions,
  };
};
