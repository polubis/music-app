import { error } from "dk";
import {
  BmollNoteName,
  BMOLL_NAMES,
  NoteOctave,
  NotePosition,
  NoteSymbol,
  OCTAVES,
  POSITIONS,
  SharpNoteName,
  SHARP_NAMES,
} from "./definitions";

export const isNotePositionSymbol = (
  symbol: NoteSymbol
): symbol is NotePosition => {
  return typeof symbol === "number";
};

export const isSharpNoteNameSymbol = (
  symbol: NoteSymbol
): symbol is SharpNoteName => {
  return SHARP_NAMES.includes(symbol as SharpNoteName);
};

export const isBmollNoteNameSymbol = (
  symbol: NoteSymbol
): symbol is BmollNoteName => {
  return BMOLL_NAMES.includes(symbol as BmollNoteName);
};

export const getNextPosition = (position: NotePosition): NotePosition => {
  const nextPosition = position + 1;
  return nextPosition === POSITIONS.length ? 0 : (nextPosition as NotePosition);
};

export const getNextOctave = (octave: NoteOctave): NoteOctave => {
  const nextOctave = octave + 1;
  return nextOctave === OCTAVES.length ? 0 : (nextOctave as NoteOctave);
};

export const getPosition = (symbol: NoteSymbol): NotePosition => {
  if (isSharpNoteNameSymbol(symbol)) {
    return SHARP_NAMES.indexOf(symbol) as NotePosition;
  }

  if (isBmollNoteNameSymbol(symbol)) {
    return BMOLL_NAMES.indexOf(symbol) as NotePosition;
  }

  return symbol;
};

export const getSharpName = (position: NotePosition): SharpNoteName | never => {
  const idx = SHARP_NAMES.findIndex((_, idx) => idx === position);

  if (idx === -1) {
    throw error(
      "SHARP_NAME_NOT_FOUND",
      `Cannot find sharp name for ${position}`
    );
  }

  return SHARP_NAMES[idx];
};

export const getBmollName = (position: NotePosition): BmollNoteName | never => {
  const idx = BMOLL_NAMES.findIndex((_, idx) => idx === position);

  if (idx === -1) {
    throw error(
      "BMOLL_NAME_NOT_FOUND",
      `Cannot find bmoll name for ${position}`
    );
  }

  return BMOLL_NAMES[idx];
};
