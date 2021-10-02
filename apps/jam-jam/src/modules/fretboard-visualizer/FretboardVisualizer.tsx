import {
  useGuitarStringsFilters,
  isSharpNotation,
  NoteNotation,
  isLeftOrientation,
  isRightOrientation,
  NOTES_POSITIONS,
  MIN_NOTES_COUNT,
  MAX_NOTES_COUNT,
  useNotesPlay,
  Note,
} from "./models";
import {
  Fretboard,
  NoteButton,
  TuningPicker,
  ChangeLog,
  ScalePicker,
  SavedFilters,
} from "./components";
import { Switch, Slider, Typography, Form, Tooltip } from "antd";
import { SoundOutlined, FontSizeOutlined } from "@ant-design/icons";

import css from "./FretboardVisualizer.module.less";
import { useEffect } from "react";

const { Title } = Typography;
const { Item } = Form;

const FretboardVisualizer = () => {
  const [
    { strings, filters, tunings },
    {
      toggleNotesNotation,
      toggleOrientation,
      toggleNotesHidden,
      updateFretsCount,
      updateFretsRange,
      updateTuning,
      updateScale,
      applyFilters,
      toggleOctavesDisplayed,
    },
  ] = useGuitarStringsFilters();

  const { update, play, isEnabled, isEnabling } = useNotesPlay();

  const handleFretboardNoteClick = (note: Note): void => {
    isEnabled && play(note);
    toggleNotesHidden(note.position);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      import("react-ga").then(({ initialize, pageview }) => {
        initialize("UA-200798883-1");
        pageview("/fretboard-visualizer");
      });
    }
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
                notation={filters.notation}
                onChange={updateTuning}
              />

              <Tooltip title="Turns on/off sound">
                <Switch
                  checkedChildren={<SoundOutlined />}
                  unCheckedChildren={<SoundOutlined />}
                  loading={isEnabling}
                  checked={isEnabled}
                  onChange={update}
                  className={css.switch}
                />
              </Tooltip>

              <Tooltip title="Changes guitar orientation to left/right">
                <Switch
                  checked={isRightOrientation(filters.orientation)}
                  checkedChildren="Right"
                  unCheckedChildren="Left"
                  onChange={toggleOrientation}
                />
              </Tooltip>
            </header>

            <Form className={css.settingsForm}>
              <Item label="Frets count" className={css.item}>
                <Slider
                  min={MIN_NOTES_COUNT}
                  max={MAX_NOTES_COUNT}
                  value={filters.notesCount}
                  onChange={updateFretsCount}
                />
              </Item>
              <Item label="Visible frets" className={css.item}>
                <Slider
                  min={MIN_NOTES_COUNT}
                  max={filters.notesCount}
                  range
                  value={filters.notesRange}
                  onChange={updateFretsRange}
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

              <Tooltip title="Shows/hides octaves numbers in notes">
                <Switch
                  className={css.switch}
                  checked={filters.octavesDisplayed}
                  checkedChildren={<FontSizeOutlined />}
                  unCheckedChildren={<FontSizeOutlined />}
                  onChange={toggleOctavesDisplayed}
                />
              </Tooltip>

              <Tooltip title="Changes notes notation">
                <Switch
                  checked={isSharpNotation(filters.notation)}
                  checkedChildren={NoteNotation.Sharp}
                  unCheckedChildren={NoteNotation.Bmoll}
                  onChange={toggleNotesNotation}
                />
              </Tooltip>
            </header>

            <div className={css.notes}>
              {NOTES_POSITIONS.map((position) => (
                <NoteButton
                  key={position}
                  position={position}
                  notation={filters.notation}
                  uncolored={filters.hiddenPositions.includes(position)}
                  onClick={() => toggleNotesHidden(position)}
                />
              ))}
            </div>
          </div>

          <SavedFilters filters={filters} onApply={applyFilters} />
        </section>
      </div>

      <Fretboard
        leftHanded={isLeftOrientation(filters.orientation)}
        octavesDisplayed={filters.octavesDisplayed}
        strings={strings}
        onNoteClick={handleFretboardNoteClick}
      />
    </div>
  );
};

export { FretboardVisualizer };
