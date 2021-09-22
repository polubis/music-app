import { useMemo } from "react";

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
  getTuningName,
  useGuitarStringsFiltersSave,
} from "./models";
import {
  Fretboard,
  NoteButton,
  TuningPicker,
  ChangeLog,
  ScalePicker,
} from "./components";
import { Switch, Slider, Typography, Form, Button, Empty, Tag } from "antd";

import css from "./FretboardVisualizer.module.less";
import { useEffect } from "react";
import { pageview } from "react-ga";

const { Title, Text } = Typography;
const { Item } = Form;

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
      updateScale,
      applyFilters,
    },
  ] = useGuitarStringsFilters();

  const currentTuningName = useMemo(
    () => getTuningName(filters.notation, tunings, filters.tuning),
    [filters.notation, tunings, filters.tuning]
  );

  const {
    saveFilters,
    currentSavedFilters,
    savedFiltersList,
    areSavedFiltersUsed,
    removeFilters,
  } = useGuitarStringsFiltersSave(filters);

  useEffect(() => {
    pageview("/fretboard-visualizer");
  }, []);

  return (
    <div className={css.container}>
      <div className={css.layout}>
        <header className={css.header}>
          <Title level={2}>JamJam</Title>
          <ChangeLog />
        </header>

        <section className={css.filters}>
          <div className={css.tile}>
            <header className={css.tileHeader}>
              <Title level={5}>Guitar</Title>

              <TuningPicker
                className={css.tuningPicker}
                tunings={tunings}
                tuning={filters.tuning}
                currentTuningName={currentTuningName}
                isLeftOrientation={
                  filters.orientation === GuitarOrientation.Left
                }
                notation={filters.notation}
                onChange={updateTuning}
              />

              <Switch
                checked={isRightOrientation(filters.orientation)}
                checkedChildren="Right"
                unCheckedChildren="Left"
                onChange={toggleOrientation}
              />
            </header>

            <Form className={css.settingsForm}>
              <Item label="Number of notes" style={{ marginBottom: "4px" }}>
                <Slider
                  min={MIN_NOTES_COUNT}
                  max={MAX_NOTES_COUNT}
                  value={filters.notesCount}
                  onChange={updateNotesCount}
                />
              </Item>
              <Item label="Visible notes" style={{ marginBottom: 0 }}>
                <Slider
                  min={MIN_NOTES_COUNT}
                  max={filters.notesCount}
                  range
                  value={filters.notesRange}
                  onChange={updateNotesRange}
                />
              </Item>
            </Form>
          </div>

          <div className={css.tile}>
            <header className={css.tileHeader}>
              <Title level={5}>Notes</Title>

              <ScalePicker
                notation={filters.notation}
                className={css.scalePicker}
                hiddenPositions={filters.hiddenPositions}
                onChange={updateScale}
              />

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

          <div className={css.tile}>
            {savedFiltersList.length > 0 ? (
              <>
                <header className={css.tileHeader}>
                  <Title level={5}>Saved filters</Title>
                  <Button
                    type="primary"
                    disabled={areSavedFiltersUsed}
                    onClick={saveFilters}
                  >
                    Save
                  </Button>
                </header>
                <div className={css.tags}>
                  {savedFiltersList.map((savedFilters, idx) => (
                    <Tag
                      closable
                      key={savedFilters.name}
                      onClick={() => applyFilters(savedFilters.filters)}
                      onClose={() => removeFilters(savedFilters.name)}
                      color={
                        currentSavedFilters?.name === savedFilters.name
                          ? "green"
                          : "geekblue"
                      }
                    >
                      {savedFilters.name}
                    </Tag>
                  ))}
                </div>
              </>
            ) : (
              <Empty
                imageStyle={{
                  height: 60,
                }}
                description={
                  <Text className={css.noSavedFilters}>
                    No saved filters yet?
                  </Text>
                }
              >
                <Button
                  type="primary"
                  disabled={areSavedFiltersUsed}
                  onClick={saveFilters}
                >
                  Save filters
                </Button>
              </Empty>
            )}
          </div>
        </section>
      </div>

      <Fretboard
        leftHanded={isLeftOrientation(filters.orientation)}
        strings={strings}
        onNoteClick={(note) => toggleNotesHidden(note.position)}
      />
    </div>
  );
};

export { FretboardVisualizer };
