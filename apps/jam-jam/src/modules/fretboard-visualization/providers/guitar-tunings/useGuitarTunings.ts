import {
  getPosition,
  GuitarTuning,
  NoteOctave,
  NoteSymbol,
  StringInstrumentTuning,
  StringInstrumentTuningId,
  StringInstrumentTuningsGroup,
  StringInstrumentTuningType,
  Note,
  getSharpName,
  getBmollName,
} from "music-core";
import { useMemo, useState } from "react";

interface SimpleStringInstrumentTuning
  extends Omit<StringInstrumentTuning, "id" | "notes"> {
  notes: {
    symbol: NoteSymbol;
    octave: NoteOctave;
  }[];
}

const createGuitarTuning = (
  tuning: SimpleStringInstrumentTuning,
  idx: number
): StringInstrumentTuning =>
  new GuitarTuning(
    tuning.name,
    tuning.type,
    tuning.notes.map((note, idx): Note => {
      const position = getPosition(note.symbol);

      return {
        ...note,
        id: idx,
        position,
        sharpName: getSharpName(position),
        bmollName: getBmollName(position),
      };
    }),
    idx
  );

const createGuitarTunings = (
  tunings: SimpleStringInstrumentTuning[]
): StringInstrumentTuning[] => tunings.map(createGuitarTuning);

const E_STANDARD = createGuitarTuning(
  {
    name: "E standard",
    type: StringInstrumentTuningType.Standard,
    notes: [
      { octave: 4, symbol: "E" },
      { octave: 3, symbol: "B" },
      { octave: 3, symbol: "G" },
      { octave: 3, symbol: "D" },
      { octave: 2, symbol: "A" },
      { octave: 2, symbol: "E" },
    ],
  },
  0
);

const TUNINGS = [
  E_STANDARD,
  ...createGuitarTunings([
    {
      name: "Drop D",
      type: StringInstrumentTuningType.Drop,
      notes: [
        { octave: 4, symbol: "E" },
        { octave: 3, symbol: "B" },
        { octave: 3, symbol: "G" },
        { octave: 3, symbol: "D" },
        { octave: 2, symbol: "A" },
        { octave: 2, symbol: "D" },
      ],
    },
    {
      name: "Double Drop D",
      type: StringInstrumentTuningType.Drop,
      notes: [
        { octave: 4, symbol: "D" },
        { octave: 3, symbol: "B" },
        { octave: 3, symbol: "G" },
        { octave: 3, symbol: "D" },
        { octave: 2, symbol: "A" },
        { octave: 2, symbol: "D" },
      ],
    },
    {
      name: "Open D",
      type: StringInstrumentTuningType.Open,
      notes: [
        { octave: 4, symbol: "D" },
        { octave: 3, symbol: "A" },
        { octave: 3, symbol: "F#" },
        { octave: 3, symbol: "D" },
        { octave: 2, symbol: "A" },
        { octave: 2, symbol: "D" },
      ],
    },
    {
      name: "Open E",
      type: StringInstrumentTuningType.Open,
      notes: [
        { octave: 4, symbol: "E" },
        { octave: 3, symbol: "B" },
        { octave: 3, symbol: "G#" },
        { octave: 3, symbol: "E" },
        { octave: 2, symbol: "B" },
        { octave: 2, symbol: "E" },
      ],
    },
    {
      name: "Open G",
      type: StringInstrumentTuningType.Open,
      notes: [
        { octave: 4, symbol: "D" },
        { octave: 3, symbol: "B" },
        { octave: 3, symbol: "G" },
        { octave: 3, symbol: "D" },
        { octave: 2, symbol: "G" },
        { octave: 2, symbol: "D" },
      ],
    },
    {
      name: "Open A",
      type: StringInstrumentTuningType.Open,
      notes: [
        { octave: 4, symbol: "E" },
        { octave: 3, symbol: "C#" },
        { octave: 3, symbol: "A" },
        { octave: 3, symbol: "E" },
        { octave: 2, symbol: "A" },
        { octave: 2, symbol: "E" },
      ],
    },
    {
      name: "Open C6",
      type: StringInstrumentTuningType.Open,
      notes: [
        { octave: 4, symbol: "E" },
        { octave: 3, symbol: "C" },
        { octave: 3, symbol: "G" },
        { octave: 3, symbol: "C" },
        { octave: 2, symbol: "A" },
        { octave: 2, symbol: "C" },
      ],
    },
    {
      name: "Open C (Chris Cornell)",
      type: StringInstrumentTuningType.Open,
      notes: [
        { octave: 4, symbol: "E" },
        { octave: 3, symbol: "G" },
        { octave: 3, symbol: "G" },
        { octave: 3, symbol: "C" },
        { octave: 2, symbol: "G" },
        { octave: 2, symbol: "C" },
      ],
    },
    {
      name: "DADGAD",
      type: StringInstrumentTuningType.Alternate,
      notes: [
        { octave: 4, symbol: "D" },
        { octave: 3, symbol: "A" },
        { octave: 3, symbol: "G" },
        { octave: 3, symbol: "D" },
        { octave: 2, symbol: "A" },
        { octave: 2, symbol: "D" },
      ],
    },
    {
      name: "DGCGCD",
      type: StringInstrumentTuningType.Alternate,
      notes: [
        { octave: 4, symbol: "D" },
        { octave: 3, symbol: "C" },
        { octave: 3, symbol: "G" },
        { octave: 3, symbol: "C" },
        { octave: 2, symbol: "G" },
        { octave: 2, symbol: "D" },
      ],
    },
    {
      name: "EEEEBE",
      type: StringInstrumentTuningType.Alternate,
      notes: [
        { octave: 4, symbol: "E" },
        { octave: 3, symbol: "B" },
        { octave: 3, symbol: "E" },
        { octave: 3, symbol: "E" },
        { octave: 2, symbol: "E" },
        { octave: 2, symbol: "E" },
      ],
    },
  ]),
];

const createTuningsGroups = (
  tunings: StringInstrumentTuning[]
): StringInstrumentTuningsGroup[] => {
  const groups: StringInstrumentTuningsGroup[] = [];

  tunings.forEach((tuning) => {
    const foundGroupIdx = groups.findIndex(
      (group) => group.type === tuning.type
    );

    if (foundGroupIdx === -1) {
      groups.push({ type: tuning.type, tunings: [tuning] });
      return;
    }

    const group = groups[foundGroupIdx];

    groups[foundGroupIdx] = {
      ...group,
      tunings: [...group.tunings, tuning],
    };
  });

  return groups;
};

export const useGuitarTunings = () => {
  const [tunings, setTunings] = useState(TUNINGS);

  const addTuning = (tuning: StringInstrumentTuning): void => {
    setTunings((prevTunings) => [tuning, ...prevTunings]);
  };

  const editTuning = (tuning: Partial<StringInstrumentTuning>): void => {
    setTunings((prevTunings) =>
      prevTunings.map((currTuning) =>
        currTuning.id === tuning.id ? { ...currTuning, ...tuning } : currTuning
      )
    );
  };

  const removeTuning = (id: StringInstrumentTuningId): void => {
    setTunings((prevTunings) =>
      prevTunings.filter((currTuning) => currTuning.id !== id)
    );
  };

  return useMemo(
    () => ({
      tunings,
      E_STANDARD,
      tuningsGroups: createTuningsGroups(tunings),
      addTuning,
      editTuning,
      removeTuning,
    }),
    [tunings]
  );
};
