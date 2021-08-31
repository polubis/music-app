import {
  NoteNotation,
  GuitarString,
  Note,
  NotePosition,
  NOTES_POSITIONS,
  FIRST_NOTE_POSITION,
  NoteOctave,
  GuitarStringTuning,
} from "./defs";
import { getNoteName, isNotePosition } from "./note";

export const createGuitarString = (
  id: number,
  position: NotePosition,
  octave: NoteOctave,
  count: number,
  notation: NoteNotation,
  hidden = false
): GuitarString => {
  const foundNotePosition = NOTES_POSITIONS.find(
    (currPosition) => currPosition === position
  );

  if (foundNotePosition === undefined) {
    throw new Error("createString() [CANNOT_FIND_POSITION]");
  }

  let positionAcc = foundNotePosition;
  let octaveAcc = octave;

  const notes = Array.from({ length: count }).map((_, i): Note => {
    const note: Note = {
      id: id * count + i,
      octave: octaveAcc,
      name: getNoteName(notation, positionAcc),
      notation,
      position: positionAcc,
    };

    const nextPosition = positionAcc + 1;

    if (isNotePosition(nextPosition)) {
      positionAcc = nextPosition;
    } else {
      positionAcc = FIRST_NOTE_POSITION;
      octaveAcc++;
    }

    return note;
  });

  return {
    id,
    notes,
    hidden,
  };
};

export const createGuitarStrings = (
  tuning: GuitarStringTuning[],
  notation: NoteNotation,
  count: number
): GuitarString[] => {
  return tuning.map(({ octave, position }, i) =>
    createGuitarString(i, position, octave, count, notation)
  );
};
