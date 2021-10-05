import {
  NotePosition,
  Scale,
  NOTES_POSITIONS,
  LAST_NOTE_POSITION,
  ScaleType,
  KeyedScale,
  ScaleInterval,
  ScaleMode,
  KeyedNamedScale,
  NoteNotation,
} from "./defs";
import { getNoteName, isNotePosition } from "./note";

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
    "Ionian",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Natural minor",
    "Locrian",
  ]),
  createScale([2, 1, 2, 2, 2, 2, 1], ScaleType.MelodicMinor, [
    "Melodic minor",
    "Dorian b2",
    "Lydian augmented",
    "Lydian dominant",
    "Aeolian dominant",
    "Half diminished",
    "Alternate",
  ]),
  createScale([2, 1, 2, 2, 1, 3, 1], ScaleType.HarmonicMinor, [
    "Harmonic minor",
    "Locrian 6",
    "Major #5",
    "Dorian #4",
    "Phrygian dominant",
    "Lydian #2",
    "Alternate dominant bb7",
  ]),
  createScale([2, 2, 1, 2, 1, 3, 1], ScaleType.HarmonicMajor, [
    "Harmonic major",
    "Dorian b5",
    "Phrygian b4",
    "Lydian b3",
    "Mixolydian b2",
    "Lydian augmented #2",
    "Locrian bb7",
  ]),
  createScale([2, 1, 2, 1, 2, 1, 2, 1], ScaleType.Diminished, [
    "Diminished",
    "Inverted diminished",
  ]),
  createScale([2, 1, 2, 1, 2, 1, 2, 1], ScaleType.WholeTone, ["Whole tone"]),
  createScale([3, 1, 3, 1, 3, 1], ScaleType.Augmented, [
    "Augmented",
    "Inverted augmented",
  ]),
  createScale([3, 2, 2, 3, 2], ScaleType.Pentatonic, [
    "Pentatonic 1",
    "Pentatonic 2",
    "Pentatonic 3",
    "Pentatonic 4",
    "Pentatonic 5",
  ]),
  createScale([1, 4, 2, 1, 4], ScaleType.Hemitonic, [
    "Hemitonic 1",
    "Hemitonic 2",
    "Hemitonic 3",
    "Hemitonic 4",
    "Hemitonic 5",
  ]),
];

export const createKeyedScale = (
  key: NotePosition,
  { pattern, type, modes }: Scale,
  mode: ScaleMode
): KeyedScale => {
  const foundPositionIdx = NOTES_POSITIONS.findIndex(
    (position) => position === key
  );

  if (foundPositionIdx === -1) {
    throw new Error("createScale() [CANNOT_FIND_POSITION]");
  }

  const positions: NotePosition[] = [key];
  let currPosition = key;

  for (let i = 0; i < mode.pattern.length; i++) {
    const nextPosition = currPosition + mode.pattern[i];

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
    modes,
    mode,
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

export const findScaleByHiddenPositions = (
  notation: NoteNotation,
  hiddenPositions: NotePosition[]
): KeyedNamedScale | undefined => {
  const positionsToCompare = NOTES_POSITIONS.filter(
    (p) => !hiddenPositions.includes(p)
  );
  positionsToCompare.push(positionsToCompare[0]);
  const positionsToCompareAsStr = positionsToCompare.join("");

  const foundScale = ALL_POSIBLE_KEYED_SCALES.find(
    (scale) => scale.positions.join("") === positionsToCompareAsStr
  );

  return foundScale
    ? {
        ...foundScale,
        notesNames: foundScale.positions.map((position) =>
          getNoteName(notation, position)
        ),
      }
    : undefined;
};
