import {
  NOTES_POSITIONS,
  Chord,
  ChordType,
  NotePosition,
  ScaleInterval,
} from "./defs";
import { createNotePosition } from "./note";

const createChord = (
  pattern: ScaleInterval[],
  type: ChordType,
  postFix: string
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
      postFix,
      type,
      id: i + type,
    });
  }

  return chords;
};

export const MAJOR_CHORDS = createChord([4, 3], ChordType.Major, "");
export const MINOR_CHORDS = createChord([3, 4], ChordType.Minor, "");
export const DIMINISHED_CHORDS = createChord([3, 3], ChordType.Diminished, "");
export const AUGMENTED_CHORDS = createChord([4, 4], ChordType.Augmented, "");
