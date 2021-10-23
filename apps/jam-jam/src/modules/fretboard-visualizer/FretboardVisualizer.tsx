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
  findScalesByHiddenPositions,
  Chord,
} from "./models";
import { Fretboard, NoteButton } from "./components";
import {
  Switch,
  Slider,
  Typography,
  Form,
  Tooltip,
  Image,
  Button,
  Tag,
} from "antd";
import { SoundOutlined, FontSizeOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";

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
import { ChordsByNotesPicker } from "./components/ChordsByNotesPicker";

const { Title } = Typography;
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
      updateHiddenPositions,
      toggleOctavesDisplayed,
      unselectAll,
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

  const handlePlayChord = (chord: Chord): void => {
    const octaves = getOctavesFromPositions(chord.positions);
    playMany(
      chord.positions.map((position, idx) => ({
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

  const usedScales = useMemo(
    () =>
      findScalesByHiddenPositions(filters.notation, filters.hiddenPositions),
    [filters]
  );

  const usedScale = usedScales.length > 0 ? usedScales[0] : undefined;

  return (
    <>
      <Helmet>
        <title>JamJam - fretboard visualization and musical progress</title>
        <meta
          name="description"
          content="Fretboard visualization and musical progress"
        />
        <meta
          property="og:description"
          content="Fretboard visualization and musical progress"
        ></meta>
        <meta
          property="og:title"
          content="JamJam - fretboard visualization and musical progress"
        />
      </Helmet>

      <div className={css.container}>
        <div className={css.layout}>
          <header className={css.header}>
            <Image
              width={64}
              alt="JamJam logo"
              preview={false}
              src="logo64.png"
            />
            <LanguageSelect />
            <Changelog />
          </header>

          <section className={css.section}>
            <Button type="primary" onClick={unselectAll}>
              {t("Unselect all")}
            </Button>
            <ChordsByNotesPicker
              notation={filters.notation}
              hiddenPositions={filters.hiddenPositions}
              onPlayChord={handlePlayChord}
              onChange={updateHiddenPositions}
            />
            <ScalePicker
              notation={filters.notation}
              hiddenPositions={filters.hiddenPositions}
              onChange={updateScale}
              usedScale={usedScale}
              onPlay={handleScalePlay}
            />
          </section>

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

                <Tooltip title={t("Turns on/off sound")}>
                  <Switch
                    checkedChildren={<SoundOutlined />}
                    unCheckedChildren={<SoundOutlined />}
                    loading={isEnabling}
                    checked={isEnabled}
                    onChange={update}
                    className={css.switch}
                  />
                </Tooltip>

                <Tooltip title={t("Changes guitar orientation to left/right")}>
                  <Switch
                    checked={isRightOrientation(filters.orientation)}
                    checkedChildren={t("Right")}
                    unCheckedChildren={t("Left")}
                    onChange={toggleOrientation}
                  />
                </Tooltip>
              </header>

              <Form className={css.settingsForm}>
                <Item label={t("Frets count")} className={css.item}>
                  <Slider
                    min={MIN_NOTES_COUNT}
                    max={MAX_NOTES_COUNT}
                    value={filters.notesCount}
                    onChange={updateFretsCount}
                  />
                </Item>
                <Item label={t("Visible notes")} className={css.item}>
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

                <Tooltip title={t("Shows/hides octaves numbers in notes")}>
                  <Switch
                    className={css.switch}
                    checked={filters.octavesDisplayed}
                    checkedChildren={<FontSizeOutlined />}
                    unCheckedChildren={<FontSizeOutlined />}
                    onChange={toggleOctavesDisplayed}
                  />
                </Tooltip>

                <Tooltip title={t("Changes notes notation")}>
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

              <div className={css.pickedScales}>
                {usedScales.map((scale, idx) => (
                  <Tag color="volcano" key={idx}>
                    {getNoteName(filters.notation, scale.key)} {scale.type}
                  </Tag>
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
    </>
  );
};

export { FretboardVisualizer };
