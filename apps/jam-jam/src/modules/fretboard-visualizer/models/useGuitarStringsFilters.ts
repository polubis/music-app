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

  const strings = createGuitarStrings(tuning, notation, notesCount);

  const [from, to] = [notesRange[0] - 1, notesRange[1] - 1];
  const positionsDict = hiddenPositions.reduce<
    Partial<Record<NotePosition, boolean>>
  >((acc, position) => ({ ...acc, [position]: true }), {});

  strings.forEach((string) => {
    string.notes.forEach((note, noteIdx) => {
      note.hidden =
        !(noteIdx >= from && noteIdx <= to) || positionsDict[note.position];
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

  const toggleNotesNotation = (): void => {
    const newFilters: GuitarStringsFilters = {
      ...filters,
      notation: getOppositeNotation(filters.notation),
    };
    setFilters(newFilters);
    setStrings(generateGuitarStrings(newFilters));
  };

  const toggleOrientation = (): void => {
    const newFilters: GuitarStringsFilters = {
      ...filters,
      tuning: [...filters.tuning].reverse(),
      orientation: getOppositeOrientation(filters.orientation),
    };
    setFilters(newFilters);
    setStrings(generateGuitarStrings(newFilters));
    setTunings(reverseTunings(tunings));
  };

  const toggleNotesHidden = (position: NotePosition): void => {
    const hidden = filters.hiddenPositions.includes(position);
    const newHiddenPositions = hidden
      ? filters.hiddenPositions.filter(
          (currPosition) => currPosition !== position
        )
      : [...filters.hiddenPositions, position];
    const newFilters: GuitarStringsFilters = {
      ...filters,
      hiddenPositions: newHiddenPositions,
    };

    setFilters(newFilters);
    setStrings(generateGuitarStrings(newFilters));
  };

  const updateNotesCount = (notesCount: number): void => {
    const newFilters: GuitarStringsFilters = { ...filters, notesCount };
    setFilters(newFilters);
    setStrings(generateGuitarStrings(newFilters));
  };

  const updateNotesRange = (notesRange: NotesRange): void => {
    const newFilters: GuitarStringsFilters = { ...filters, notesRange };
    setFilters(newFilters);
    setStrings(generateGuitarStrings(newFilters));
  };

  const updateTuning = (tuning: GuitarStringTuning[]): void => {
    const newFilters: GuitarStringsFilters = {
      ...filters,
      tuning,
    };
    setFilters(newFilters);
    setStrings(generateGuitarStrings(newFilters));
  };

  const updateScale = (positions: NotePosition[]): void => {
    const newFilters: GuitarStringsFilters = {
      ...filters,
      hiddenPositions: NOTES_POSITIONS.filter(
        (position) => !positions.includes(position)
      ),
    };
    setFilters(newFilters);
    setStrings(generateGuitarStrings(newFilters));
  };

  return [
    { strings, filters, tunings },
    {
      toggleNotesNotation,
      toggleOrientation,
      toggleNotesHidden,
      updateNotesCount,
      updateNotesRange,
      updateTuning,
      updateScale,
    },
  ] as const;
};
