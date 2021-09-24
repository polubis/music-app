import { isEqual } from "lodash";
import {
  DescribedGuitarStringTuning,
  GroupedDescribedGuitarTunings,
  TuningCategory,
  NoteNotation,
  GuitarStringTuning,
} from "./defs";
import { getNoteName } from "./note";

export const COMMON_TUNINGS: DescribedGuitarStringTuning[] = [
  {
    name: "E standard",
    category: TuningCategory.Standard,
    tuning: [
      { octave: 2, position: 4, id: 0 },
      { octave: 2, position: 9, id: 1 },
      { octave: 3, position: 2, id: 2 },
      { octave: 3, position: 7, id: 3 },
      { octave: 3, position: 11, id: 4 },
      { octave: 4, position: 4, id: 5 },
    ],
  },
  // {
  //   name: "Drop D",
  //   category: TuningCategory.Drop,
  //   tuning: [
  //     { octave: 2, position: 2, id: 0 },
  //     { octave: 2, position: 9, id: 1 },
  //     { octave: 3, position: 2, id: 2 },
  //     { octave: 3, position: 7, id: 3 },
  //     { octave: 3, position: 11, id: 4 },
  //     { octave: 4, position: 4, id: 5 },
  //   ],
  // },
  // {
  //   name: "Double Drop D",
  //   category: TuningCategory.Drop,
  //   tuning: [
  //     { octave: 2, position: 2, id: 0 },
  //     { octave: 2, position: 9, id: 1 },
  //     { octave: 3, position: 2, id: 2 },
  //     { octave: 3, position: 7, id: 3 },
  //     { octave: 3, position: 11, id: 4 },
  //     { octave: 4, position: 2, id: 5 },
  //   ],
  // },
  // {
  //   name: "DADGAD",
  //   category: TuningCategory.Alternate,
  //   tuning: [
  //     { octave: 4, position: 2, id: 0 },
  //     { octave: 3, position: 9, id: 1 },
  //     { octave: 3, position: 7, id: 2 },
  //     { octave: 3, position: 2, id: 3 },
  //     { octave: 2, position: 9, id: 4 },
  //     { octave: 2, position: 2, id: 5 },
  //   ],
  // },
  // {
  //   name: "DGCGCD",
  //   category: TuningCategory.Alternate,
  //   tuning: [
  //     { octave: 4, position: 2, id: 0 },
  //     { octave: 3, position: 0, id: 1 },
  //     { octave: 3, position: 7, id: 2 },
  //     { octave: 3, position: 0, id: 3 },
  //     { octave: 2, position: 7, id: 4 },
  //     { octave: 2, position: 4, id: 5 },
  //   ],
  // },
  // {
  //   name: "EEEEBE",
  //   category: TuningCategory.Alternate,
  //   tuning: [
  //     { octave: 4, position: 4, id: 0 },
  //     { octave: 3, position: 11, id: 1 },
  //     { octave: 3, position: 4, id: 2 },
  //     { octave: 3, position: 4, id: 3 },
  //     { octave: 2, position: 4, id: 4 },
  //     { octave: 2, position: 4, id: 5 },
  //   ],
  // },
  // {
  //   name: "Open D",
  //   category: TuningCategory.Open,
  //   tuning: [
  //     { octave: 4, position: 2, id: 0 },
  //     { octave: 3, position: 9, id: 1 },
  //     { octave: 3, position: 6, id: 2 },
  //     { octave: 3, position: 2, id: 3 },
  //     { octave: 2, position: 9, id: 4 },
  //     { octave: 2, position: 2, id: 5 },
  //   ],
  // },
  // {
  //   name: "Open E",
  //   category: TuningCategory.Open,
  //   tuning: [
  //     { octave: 4, position: 4, id: 0 },
  //     { octave: 3, position: 11, id: 1 },
  //     { octave: 3, position: 8, id: 2 },
  //     { octave: 3, position: 4, id: 3 },
  //     { octave: 2, position: 11, id: 4 },
  //     { octave: 2, position: 4, id: 5 },
  //   ],
  // },
  // {
  //   name: "Open G",
  //   category: TuningCategory.Open,
  //   tuning: [
  //     { octave: 4, position: 2, id: 0 },
  //     { octave: 3, position: 11, id: 1 },
  //     { octave: 3, position: 7, id: 2 },
  //     { octave: 3, position: 2, id: 3 },
  //     { octave: 2, position: 7, id: 4 },
  //     { octave: 2, position: 2, id: 5 },
  //   ],
  // },
  // {
  //   name: "Open A",
  //   category: TuningCategory.Open,
  //   tuning: [
  //     { octave: 4, position: 4, id: 0 },
  //     { octave: 3, position: 1, id: 1 },
  //     { octave: 3, position: 9, id: 2 },
  //     { octave: 3, position: 4, id: 3 },
  //     { octave: 2, position: 9, id: 4 },
  //     { octave: 2, position: 4, id: 5 },
  //   ],
  // },
  // {
  //   name: "Open C6",
  //   category: TuningCategory.Open,
  //   tuning: [
  //     { octave: 4, position: 4, id: 0 },
  //     { octave: 3, position: 0, id: 1 },
  //     { octave: 3, position: 7, id: 2 },
  //     { octave: 3, position: 0, id: 3 },
  //     { octave: 2, position: 9, id: 4 },
  //     { octave: 2, position: 0, id: 5 },
  //   ],
  // },
  // {
  //   name: "Open C",
  //   category: TuningCategory.Open,
  //   tuning: [
  //     { octave: 4, position: 4, id: 0 },
  //     { octave: 3, position: 7, id: 1 },
  //     { octave: 3, position: 7, id: 2 },
  //     { octave: 3, position: 0, id: 3 },
  //     { octave: 2, position: 7, id: 4 },
  //     { octave: 2, position: 0, id: 5 },
  //   ],
  // },
];

export const groupTunings = (
  tunings: DescribedGuitarStringTuning[]
): GroupedDescribedGuitarTunings => {
  return tunings.reduce<GroupedDescribedGuitarTunings>(
    (acc, tuning) => ({
      ...acc,
      [tuning.category]: [...(acc[tuning.category] ?? []), tuning],
    }),
    {} as GroupedDescribedGuitarTunings
  );
};

export const formatTuningNoteNames = (
  notation: NoteNotation,
  tuning: GuitarStringTuning[]
): string => {
  return tuning.map((item) => getNoteName(notation, item.position)).join(",");
};

export const getTuningName = (
  notation: NoteNotation,
  tunings: DescribedGuitarStringTuning[],
  tuning: GuitarStringTuning[]
): string => {
  const foundTuning = tunings.find((currTuning) =>
    isEqual(currTuning.tuning, tuning)
  );
  return foundTuning
    ? `${foundTuning.name}: ${formatTuningNoteNames(
        notation,
        foundTuning.tuning
      )}`
    : `Custom tuning: ${formatTuningNoteNames(notation, tuning)}`;
};

export const reverseTunings = (
  tunings: DescribedGuitarStringTuning[]
): DescribedGuitarStringTuning[] => {
  return tunings.map(
    (tuning): DescribedGuitarStringTuning => ({
      ...tuning,
      tuning: [...tuning.tuning].reverse(),
    })
  );
};
