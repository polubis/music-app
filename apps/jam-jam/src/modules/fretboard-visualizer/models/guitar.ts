import { GuitarOrientation, GuitarStringTuning } from "./defs";

export const DEFAULT_GUITAR_STRINGS_TUNING: GuitarStringTuning[] = [
  { octave: 4, position: 4, id: 0 },
  { octave: 3, position: 11, id: 1 },
  { octave: 3, position: 7, id: 2 },
  { octave: 3, position: 2, id: 3 },
  { octave: 2, position: 9, id: 4 },
  { octave: 2, position: 4, id: 5 },
];

export const isRightOrientation = (orientation: GuitarOrientation): boolean =>
  orientation === GuitarOrientation.Right;

export const isLeftOrientation = (orientation: GuitarOrientation): boolean =>
  orientation === GuitarOrientation.Left;

export const getOppositeOrientation = (
  orientation: GuitarOrientation
): GuitarOrientation =>
  isLeftOrientation(orientation)
    ? GuitarOrientation.Right
    : GuitarOrientation.Left;
