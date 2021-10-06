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
  getNoteName,
  NotePosition,
  getOctavesFromPositions,
  findScaleByHiddenPositions,
} from "./models";
import { Fretboard, NoteButton } from "./components";
import { Switch, Slider, Typography, Form, Tooltip, Image } from "antd";
import { SoundOutlined, FontSizeOutlined } from "@ant-design/icons";

import css from "./FretboardVisualizer.module.less";
import { useEffect } from "react";
import { LanguageSelect } from "components";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import {
  SavedFilters,
  Changelog,
  TuningPicker,
  ScalePicker,
} from "./components";

const { Title, Text } = Typography;
const { Item } = Form;

const FretboardVisualizer = () => {
  const { t } = useTranslation();
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

  const { update, play, playMany, isEnabled, isEnabling } = useNotesPlay();

  const handleFretboardNoteClick = (note: Note): void => {
    isEnabled && play(note);
    toggleNotesHidden(note.position);
  };

  const handleTuningPlay = (): void => {
    playMany(
      filters.tuning
        .map((item) => ({
          ...item,
          name: getNoteName(filters.notation, item.position),
          notation: filters.notation,
        }))
        .reverse()
    );
  };

  const handleScalePlay = (positions: NotePosition[]): void => {
    const octaves = getOctavesFromPositions(positions);
    playMany(
      positions.map((position, idx) => ({
        position,
        id: idx,
        octave: octaves[idx],
        name: getNoteName(filters.notation, position),
        notation: filters.notation,
      }))
    );
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      import("react-ga").then(({ initialize, pageview }) => {
        initialize("UA-200798883-1");
        pageview("/fretboard-visualizer");
      });
    }
  }, []);

  const usedScale = useMemo(
    () => findScaleByHiddenPositions(filters.notation, filters.hiddenPositions),
    [filters]
  );

  return (
    <div className={css.container}>
      <div className={css.layout}>
        <header className={css.header}>
          <Image width={64} preview={false} src="logo64.png" />
          <LanguageSelect />
          <Changelog />
        </header>

        <section className={css.filters}>
          <div className={css.tile}>
            <header className={css.tileHeader}>
              <Title level={5}>{t("Guitar")}</Title>

              <TuningPicker
                className={css.tuningPicker}
                tunings={tunings}
                tuning={filters.tuning}
                notation={filters.notation}
                onChange={updateTuning}
                onPlay={handleTuningPlay}
              />

              <Tooltip title={t("SoundTooltip")}>
                <Switch
                  checkedChildren={<SoundOutlined />}
                  unCheckedChildren={<SoundOutlined />}
                  loading={isEnabling}
                  checked={isEnabled}
                  onChange={update}
                  className={css.switch}
                />
              </Tooltip>

              <Tooltip title={t("GuitarOrientationTooltip")}>
                <Switch
                  checked={isRightOrientation(filters.orientation)}
                  checkedChildren={t("Right")}
                  unCheckedChildren={t("Left")}
                  onChange={toggleOrientation}
                />
              </Tooltip>
            </header>

            <Form className={css.settingsForm}>
              <Item label={t("FretsCount")} className={css.item}>
                <Slider
                  min={MIN_NOTES_COUNT}
                  max={MAX_NOTES_COUNT}
                  value={filters.notesCount}
                  onChange={updateFretsCount}
                />
              </Item>
              <Item label={t("VisibleFrets")} className={css.item}>
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
              <Title level={5}>{t("Notes")}</Title>

              <ScalePicker
                notation={filters.notation}
                className={css.scalePicker}
                hiddenPositions={filters.hiddenPositions}
                onChange={updateScale}
                usedScale={usedScale}
                onPlay={handleScalePlay}
              />

              <Tooltip title={t("OctaveDisplayTooltip")}>
                <Switch
                  className={css.switch}
                  checked={filters.octavesDisplayed}
                  checkedChildren={<FontSizeOutlined />}
                  unCheckedChildren={<FontSizeOutlined />}
                  onChange={toggleOctavesDisplayed}
                />
              </Tooltip>

              <Tooltip title={t("NotationTooltip")}>
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

            <Text className={css.pickedScale}>
              {usedScale &&
                t("PickedScale", {
                  key: getNoteName(filters.notation, usedScale.key),
                  type: usedScale.type,
                })}
            </Text>
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
