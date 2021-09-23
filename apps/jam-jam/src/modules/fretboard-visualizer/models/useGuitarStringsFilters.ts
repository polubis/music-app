import { useState } from "react";
import { createGuitarStrings } from "./guitarString";
import {
  NoteNotation,
  GuitarString,
  GuitarStringsFilters,
  GuitarOrientation,
  NotePosition,
  NotesRange,
  GuitarStringTuning,
  NOTES_POSITIONS,
} from "./defs";
import { getOppositeNotation } from "./notation";
import {
  getOppositeOrientation,
  DEFAULT_GUITAR_STRINGS_TUNING,
} from "./guitar";
import { DEFAULT_NUMBER_OF_NOTES, DEFAULT_NOTES_RANGE } from "./note";
import { reverseTunings, COMMON_TUNINGS } from "./guitarStringTuning";

const generateGuitarStrings = (
  filters: GuitarStringsFilters
): GuitarString[] => {
  const { tuning, notation, hiddenPositions, notesCount, notesRange } = filters;
  const fretsCount = notesCount + 1;

  const strings = createGuitarStrings(tuning, notation, fretsCount);

  const [from, to] = [notesRange[0], notesRange[1]];
  const positionsDict = hiddenPositions.reduce<
    Partial<Record<NotePosition, boolean>>
  >((acc, position) => ({ ...acc, [position]: true }), {});

  strings.forEach((string) => {
    string.notes.forEach((note, noteIdx) => {
      note.hidden =
        noteIdx === 0
          ? false
          : positionsDict[note.position] || !(noteIdx >= from && noteIdx <= to);
    });
  });

  return strings;
};

const FILTERS: GuitarStringsFilters = {
  tuning: DEFAULT_GUITAR_STRINGS_TUNING,
  orientation: GuitarOrientation.Right,
  notation: NoteNotation.Sharp,
  hiddenPositions: [],
  notesCount: DEFAULT_NUMBER_OF_NOTES,
  notesRange: DEFAULT_NOTES_RANGE,
};
const STRINGS = generateGuitarStrings(FILTERS);

export const useGuitarStringsFilters = () => {
  const [tunings, setTunings] = useState(COMMON_TUNINGS);
  const [filters, setFilters] = useState(FILTERS);
  const [strings, setStrings] = useState(STRINGS);

  const applyFilters = (filters: GuitarStringsFilters): void => {
    setFilters(filters);
    setStrings(generateGuitarStrings(filters));
  };

  const toggleNotesNotation = (): void => {
    applyFilters({
      ...filters,
      notation: getOppositeNotation(filters.notation),
    });
  };

  const toggleOrientation = (): void => {
    applyFilters({
      ...filters,
      tuning: [...filters.tuning].reverse(),
      orientation: getOppositeOrientation(filters.orientation),
    });
    setTunings(reverseTunings(tunings));
  };

  const toggleNotesHidden = (position: NotePosition): void => {
    const hidden = filters.hiddenPositions.includes(position);
    const newHiddenPositions = hidden
      ? filters.hiddenPositions.filter(
          (currPosition) => currPosition !== position
        )
      : [...filters.hiddenPositions, position];
    applyFilters({
      ...filters,
      hiddenPositions: newHiddenPositions,
    });
  };

  const updateFretsCount = (notesCount: number): void => {
    applyFilters({
      ...filters,
      notesCount,
      notesRange: [filters.notesRange[0], notesCount],
    });
  };

  const updateFretsRange = (notesRange: NotesRange): void => {
    applyFilters({ ...filters, notesRange });
  };

  const updateTuning = (tuning: GuitarStringTuning[]): void => {
    applyFilters({ ...filters, tuning });
  };

  const updateScale = (positions: NotePosition[]): void => {
    applyFilters({
      ...filters,
      hiddenPositions: NOTES_POSITIONS.filter(
        (position) => !positions.includes(position)
      ),
    });
  };

  return [
    { strings, filters, tunings },
    {
      toggleNotesNotation,
      toggleOrientation,
      toggleNotesHidden,
      updateFretsCount,
      updateFretsRange,
      updateTuning,
      applyFilters,
      updateScale,
    },
  ] as const;
};
