import {
  NOTES_POSITIONS,
  Chord,
  ChordType,
  NotePosition,
  ScaleInterval,
  Finger,
} from "./defs";
import { createNotePosition } from "./note";

const createChord = (
  pattern: ScaleInterval[],
  type: ChordType,
  symbol: string
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

export const getChordsVariants = (chord: Chord, shapes: string[]) => {};

// const createFingersRow = (): [Finger, Finger, Finger, Finger] => {
//   return [1, 2, 3, 1];
// };

// getChordsVariants(MAJOR_CHORDS[0]);

// [1, null, null, null],
// [1, null, null, null],
// [1, null, null, null],
// [1, null, 3, null],
// [1, null, 2, null],
// [1, null, null, null],

// [0, null, null, null],
// [0, null, null, null],
// [0, null, null, null],
// [0, null, 3, null],
// [0, null, 2, null],
// [0, null, null, null],
