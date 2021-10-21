import {
  NotePosition,
  Scale,
  NOTES_POSITIONS,
  ScaleType,
  KeyedScale,
  ScaleInterval,
  ScaleMode,
  KeyedNamedScale,
  NoteNotation,
} from "./defs";
import { createNotePosition, getNoteName } from "./note";

const slicePattern = (pattern: ScaleInterval[]): ScaleInterval[] => {
  const length = pattern.length;
  const first = pattern[0];
  return [...pattern.slice(1, length), first];
};

const createScale = (
  pattern: ScaleInterval[],
  type: ScaleType,
  modesNames: string[]
): Scale => {
  let recentPattern = [...pattern];

  return {
    type,
    pattern,
    modes: modesNames.map((name, idx) => {
      recentPattern = idx === 0 ? recentPattern : slicePattern(recentPattern);

      return {
        name,
        pattern: recentPattern,
      };
    }),
  };
};

export const SCALES: Scale[] = [
  createScale([2, 2, 1, 2, 2, 2, 1], ScaleType.Major, [
    "Ionian (Major)",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Aeolian (Natural minor)",
    "Locrian",
  ]),
  createScale([2, 1, 2, 2, 1, 2, 2], ScaleType.NaturalMinor, [
    "Aeolian (Natural minor)",
    "Locrian",
    "Ionian (Major)",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
  ]),
  createScale([2, 1, 2, 2, 2, 2, 1], ScaleType.MelodicMinor, [
    "Melodic minor",
    "Dorian b2 (Phrygian #6)",
    "Lydian augmented",
    "Lydian dominant",
    "Mixolydian b6",
    "Aeolian b5 (Locrian #2)",
    "Altered scale (Super Locrian)",
  ]),
  createScale([2, 1, 2, 2, 1, 3, 1], ScaleType.HarmonicMinor, [
    "Harmonic minor",
    "Locrian 13 (Locrian 6)",
    "Ionian #5",
    "Dorian #11 (Dorian #4)",
    "Phrygian dominant",
    "Lydian #2",
    "Super locrian bb7",
  ]),
  createScale([2, 2, 1, 2, 1, 3, 1], ScaleType.HarmonicMajor, [
    "Ionian b6 (Harmonic major)",
    "Dorian b5",
    "Phrygian b4",
    "Lydian b3",
    "Mixolydian b2",
    "Lydian Augmented #2",
    "Locrian bb7",
  ]),
  createScale([3, 1, 3, 1, 3, 1], ScaleType.Augmented, [
    "Augmented",
    "Inverted augmented",
  ]),
  createScale([2, 1, 2, 1, 2, 1, 2, 1], ScaleType.Diminished, [
    "Diminished (Whole tone)",
    "Inverted diminished",
  ]),
  createScale([2, 1, 2, 1, 2, 1, 2, 1], ScaleType.WholeTone, [
    "Whole tone (Diminished)",
  ]),
];

export const createKeyedScale = (
  key: NotePosition,
  { pattern, type, modes }: Scale,
  mode: ScaleMode
): KeyedScale => {
  const foundModeIdx = modes.findIndex(
    (currMode) => currMode.name === mode.name
  );

  if (foundModeIdx === -1) {
    throw new Error("createScale() [CANNOT_FIND_MODE]");
  }

  const intervalsSum = pattern
    .filter((_, idx) => idx < foundModeIdx)
    .reduce((acc, interval) => interval + acc, 0);

  let position = createNotePosition(key + intervalsSum);
  const positions = [position];

  for (let i = 0; i < mode.pattern.length; i++) {
    const nextPosition = position + mode.pattern[i];
    position = createNotePosition(nextPosition);
    positions.push(position);
  }

  return {
    pattern,
    key,
    type,
    positions,
    modes,
  };
};

const getAllPosibileKeyedScales = (): KeyedScale[] => {
  const positions: KeyedScale[] = [];

  for (let i = 0; i < NOTES_POSITIONS.length; i++) {
    for (let j = 0; j < SCALES.length; j++) {
      const scale = SCALES[j];
      scale.modes.forEach((mode) => {
        positions.push(createKeyedScale(NOTES_POSITIONS[i], scale, mode));
      });
    }
  }

  return positions;
};

export const ALL_POSIBLE_KEYED_SCALES = getAllPosibileKeyedScales();

export const findScalesByHiddenPositions = (
  notation: NoteNotation,
  hiddenPositions: NotePosition[]
): KeyedNamedScale[] => {
  const positionsToCompare = NOTES_POSITIONS.filter(
    (p) => !hiddenPositions.includes(p)
  );
  positionsToCompare.push(positionsToCompare[0]);
  const positionsToCompareAsStr = positionsToCompare.join("");

  const foundScales = ALL_POSIBLE_KEYED_SCALES.filter(
    (scale) => scale.positions.join("") === positionsToCompareAsStr
  ).map((foundScale) => ({
    ...foundScale,
    notesNames: foundScale.positions.map((position) =>
      getNoteName(notation, position)
    ),
  }));

  return foundScales;
};
