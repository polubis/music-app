import {
  NOTES_POSITIONS,
  Chord,
  ChordType,
  NotePosition,
  ScaleInterval,
  GroupedChord,
  ChordSymbol,
} from "./defs";
import { createNotePosition } from "./note";

const createChord = (
  pattern: ScaleInterval[],
  type: ChordType,
  symbol: ChordSymbol
): Chord[] => {
  const chords: Chord[] = [];

  for (let i = 0; i < NOTES_POSITIONS.length; i++) {
    let position = NOTES_POSITIONS[i];
    const positions: NotePosition[] = [position];

    for (let j = 0; j < pattern.length; j++) {
      const nextPosition = position + pattern[j];
      position = createNotePosition(nextPosition);
      positions.push(position);
    }

    chords.push({
      rootPosition: NOTES_POSITIONS[i],
      positions,
      symbol,
      type,
      id: i + type,
    });
  }

  return chords;
};

export const MAJOR_CHORDS = createChord([4, 3], ChordType.Major, "major");
export const MINOR_CHORDS = createChord([3, 4], ChordType.Minor, "minor");
export const DIMINISHED_CHORDS = createChord([3, 3], ChordType.Diminished, "°");
export const AUGMENTED_CHORDS = createChord([4, 4], ChordType.Augmented, "+");

export const GROUPED_CHORDS: GroupedChord[] = [
  {
    chords: MAJOR_CHORDS,
    type: ChordType.Major,
  },
  {
    chords: MINOR_CHORDS,
    type: ChordType.Minor,
  },
  {
    chords: AUGMENTED_CHORDS,
    type: ChordType.Augmented,
  },
  {
    chords: DIMINISHED_CHORDS,
    type: ChordType.Diminished,
  },
];

export const ALL_CHORDS = [
  ...MAJOR_CHORDS,
  ...MINOR_CHORDS,
  ...DIMINISHED_CHORDS,
  ...AUGMENTED_CHORDS,
];

export const findChordsByPositions = (positions: NotePosition[]): Chord[] => {
  return ALL_CHORDS.filter((chord) =>
    chord.positions.every((position) => positions.includes(position))
  );
};
