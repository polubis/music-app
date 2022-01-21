import { useEffect, useMemo, useState } from "react";
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
  Chord,
  PickedChords,
  AutomaticChordsVisualizationSettings,
} from "./defs";
import { getOppositeNotation } from "./notation";
import {
  getOppositeOrientation,
  DEFAULT_GUITAR_STRINGS_TUNING,
  isLeftOrientation,
} from "./guitar";
import { DEFAULT_NUMBER_OF_NOTES, DEFAULT_NOTES_RANGE } from "./note";
import { COMMON_TUNINGS } from "./guitarStringTuning";
import { uniq } from "lodash";
import { useMetronome } from "./useMetronome";

const generateGuitarStrings = (
  filters: GuitarStringsFilters
): GuitarString[] => {
  const {
    tuning,
    notation,
    hiddenPositions,
    orientation,
    notesCount,
    notesRange,
  } = filters;
  const fretsCount = notesCount + 1;
  const reversedTuning = isLeftOrientation(orientation)
    ? [...tuning].reverse()
    : tuning;

  const strings = createGuitarStrings(reversedTuning, notation, fretsCount);

  const [from, to] = [notesRange[0], notesRange[1]];
  const positionsDict = hiddenPositions.reduce<
    Partial<Record<NotePosition, boolean>>
  >((acc, position) => ({ ...acc, [position]: true }), {});

  strings.forEach((string) => {
    string.notes.forEach((note, noteIdx) => {
      note.hidden =
        positionsDict[note.position] || !(noteIdx >= from && noteIdx <= to);
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
  octavesDisplayed: false,
};
const STRINGS = generateGuitarStrings(FILTERS);

export const useGuitarStringsFilters = () => {
  const [automaticChordsVisualization, setAutomaticChordsVisualization] =
    useState(false);
  const [
    automaticChordsVisualizationSettings,
    setAutomaticChordsVisualizationSettings,
  ] = useState<AutomaticChordsVisualizationSettings>({ bpm: 120 });
  const [currentVisualizatedChord, setCurrentVisualizedChord] =
    useState<Chord>();
  const [prevPickedChords, setPrevPickedChords] = useState<PickedChords>({});
  const [pickedChords, setPickedChords] = useState<PickedChords>({});
  const [filters, setFilters] = useState(FILTERS);
  const [strings, setStrings] = useState(STRINGS);
  const { tick, toggleMetronome, preparingMetronome } = useMetronome(
    automaticChordsVisualizationSettings.bpm
  );

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
      orientation: getOppositeOrientation(filters.orientation),
    });
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

  const updateHiddenPositions = (positions: NotePosition[]): void => {
    applyFilters({
      ...filters,
      hiddenPositions: positions,
    });
  };

  const toggleOctavesDisplayed = (): void => {
    applyFilters({ ...filters, octavesDisplayed: !filters.octavesDisplayed });
  };

  const unselectAll = (): void => {
    applyFilters({ ...filters, hiddenPositions: [...NOTES_POSITIONS] });
  };

  const pickChord = (chord: Chord): void => {
    const newPickedChords = {
      ...pickedChords,
      [chord.id]: prevPickedChords[chord.id] ? undefined : chord,
    };
    setPickedChords(newPickedChords);
    setPrevPickedChords(newPickedChords);
  };

  const updateBpm = (bpm: number): void => {
    setAutomaticChordsVisualizationSettings((prevSettings) => ({
      ...prevSettings,
      bpm,
    }));
  };

  const toggleAutomaticChordsVisualization = (): void => {
    setAutomaticChordsVisualization((prevAutomatic) => !prevAutomatic);
  };

  const hasAtleastOnePickedChord = useMemo(
    () => Object.values(pickedChords).some((chord) => chord),
    [pickedChords]
  );

  const stringsByPickedChords = useMemo(() => {
    if (!hasAtleastOnePickedChord) {
      return [];
    }

    const chords = Object.values(pickedChords).filter(
      (chord) => chord !== undefined
    ) as Chord[];

    const positions = uniq(chords.flatMap((chord) => chord.positions));
    const hiddenPositions = NOTES_POSITIONS.filter(
      (position) => !positions.includes(position)
    );

    return generateGuitarStrings({
      ...filters,
      hiddenPositions,
    });
  }, [pickedChords, filters]);

  useEffect(() => {
    setPickedChords({});
    setPrevPickedChords({});
  }, [filters]);

  // useEffect(() => {
  //   if (!automaticChordsVisualization && currentVisualizatedChord) {
  //     setCurrentVisualizedChord(undefined);
  //     setPrevPickedChords(pickedChords);
  //     setPickedChords(pickedChords);
  //   }
  // }, [pickedChords, currentVisualizatedChord, automaticChordsVisualization]);

  useEffect(() => {
    if (tick === 4) {
      const chords = (
        Object.values(prevPickedChords).filter((chord) => !!chord) as Chord[]
      ).sort((a, b) => {
        if (a.rootPosition > b.rootPosition) {
          return 1;
        }

        if (a.rootPosition === b.rootPosition) {
          return 0;
        }

        return -1;
      });

      console.log(chords);

      const visualizedChordIdx = currentVisualizatedChord
        ? chords.findIndex((chord) => chord.id === currentVisualizatedChord.id)
        : -1;
      const visualizedChord = chords[visualizedChordIdx + 1];

      setCurrentVisualizedChord(visualizedChord);
      setPickedChords({ [visualizedChord.id]: visualizedChord });
    }
  }, [tick, currentVisualizatedChord]);

  return [
    {
      strings,
      filters,
      tunings: COMMON_TUNINGS,
      preparingMetronome,
      pickedChords,
      stringsByPickedChords,
      hasAtleastOnePickedChord,
      automaticChordsVisualization,
      automaticChordsVisualizationSettings,
    },
    {
      toggleMetronome,
      toggleNotesNotation,
      toggleOrientation,
      toggleNotesHidden,
      updateFretsCount,
      updateFretsRange,
      updateTuning,
      applyFilters,
      updateScale,
      updateHiddenPositions,
      toggleAutomaticChordsVisualization,
      toggleOctavesDisplayed,
      unselectAll,
      pickChord,
      updateBpm,
    },
  ] as const;
};
