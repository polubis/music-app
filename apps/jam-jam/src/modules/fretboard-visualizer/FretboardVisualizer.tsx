import React from "react";

import { Heading } from "ui";
import {
  useGuitarStringsFilters,
  isSharpNotation,
  NoteNotation,
  isLeftOrientation,
  isRightOrientation,
  NOTES_POSITIONS,
  MIN_NOTES_COUNT,
  MAX_NOTES_COUNT,
  GuitarOrientation,
} from "./models";
import { Fretboard, NoteButton, TuningPicker, ChangeLog } from "./components";
import { Switch, Slider } from "antd";

import css from "./FretboardVisualizer.scss";

const FretboardVisualizer = () => {
  const [
    { strings, filters, tunings },
    {
      toggleNotesNotation,
      toggleOrientation,
      toggleNotesHidden,
      updateNotesCount,
      updateNotesRange,
      updateTuning,
    },
  ] = useGuitarStringsFilters();

  return (
    <div className={css.container}>
      <header className={css.header}>
        <Heading className={css.heading} variant="large">
          Fretboard visualizer version: 1.0.0
        </Heading>

        <ChangeLog />
      </header>

      <section className={css.tiles}>
        <div className={css.tile}>
          <header className={css.tileHeader}>
            <Heading className={css.tileHeading} variant="medium">
              Notes
            </Heading>

            <Switch
              checked={isSharpNotation(filters.notation)}
              checkedChildren={NoteNotation.Sharp}
              unCheckedChildren={NoteNotation.Bmoll}
              onChange={toggleNotesNotation}
            />
          </header>

          <div className={css.notes}>
            {NOTES_POSITIONS.map((position) => (
              <NoteButton
                key={position}
                position={position}
                notation={filters.notation}
                unactive={filters.hiddenPositions.includes(position)}
                onClick={() => toggleNotesHidden(position)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={css.filters}>
        <div className={css.filter}>
          <TuningPicker
            tunings={tunings}
            tuning={filters.tuning}
            isLeftOrientation={filters.orientation === GuitarOrientation.Left}
            notation={filters.notation}
            onChange={updateTuning}
          />
        </div>
        <div className={css.filter}>
          <Heading variant="medium">Number of notes</Heading>
          <Slider
            className={css.slider}
            min={MIN_NOTES_COUNT}
            max={MAX_NOTES_COUNT}
            value={filters.notesCount}
            onChange={updateNotesCount}
          />
        </div>

        <div className={css.filter}>
          <Heading variant="medium">Visible notes</Heading>
          <Slider
            className={css.slider}
            min={MIN_NOTES_COUNT}
            max={filters.notesCount}
            range
            value={filters.notesRange}
            onChange={updateNotesRange}
          />
        </div>

        <div className={css.filter}>
          <Switch
            checked={isRightOrientation(filters.orientation)}
            checkedChildren="Right hand"
            unCheckedChildren="Left hand"
            onChange={toggleOrientation}
          />
        </div>
      </section>

      <Fretboard
        leftHanded={isLeftOrientation(filters.orientation)}
        strings={strings}
        onNoteClick={(note) => toggleNotesHidden(note.position)}
      />
    </div>
  );
};

export { FretboardVisualizer };
