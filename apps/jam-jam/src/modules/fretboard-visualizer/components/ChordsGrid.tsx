import {
  Chord,
  getNoteName,
  NoteNotation,
  ChordType,
  KeyedNamedScale,
  SCALE_INTERVAL_NOTATION_DICT,
  NotePosition,
  MAX_ALLOWED_BPM,
  MIN_ALLOWED_BPM,
  PickedChords,
} from "../models";
import { Card, Typography, Checkbox, Tag, Tooltip, Switch, Slider } from "antd";

import css from "./ChordsGrid.module.less";
import { useTranslation } from "react-i18next";
import { PlayManyButton } from "./PlayManyButton";
import { useEffect, useMemo, useState } from "react";
import { uniq } from "lodash";
import { ChordInScaleSymbol } from "./ChordInScaleSymbol";
import { SwitchChangeEventHandler } from "antd/lib/switch";

const { Title } = Typography;

interface ChordsGridProps {
  chords: Chord[];
  usedScales: KeyedNamedScale[];
  pickedChords: PickedChords;
  notation: NoteNotation;
  automaticChords: boolean;
  bpm: number;
  automaticChordsChangeOff: boolean;
  automaticChordsChangeLoading: boolean;
  onPlayNoteClick: (chord: Chord) => void;
  onAutomaticChordsChange: SwitchChangeEventHandler;
  onChordClick: (chord: Chord) => void;
  onBpmChange: (bpm: number) => void;
}

const takeScaleBaseChords = (
  chords: Chord[],
  activeScale: KeyedNamedScale
): Chord[] => {
  const positions = uniq(activeScale.positions);
  let acc = positions.findIndex((p) => p === activeScale.key);
  const foundChords: Chord[] = [];

  for (let i = 0; i < positions.length; i++) {
    let nextAcc = acc;
    const chordPositions = [acc];

    for (let j = 0; j < 2; j++) {
      const incrNextAcc = nextAcc + 2;
      nextAcc =
        incrNextAcc >= positions.length
          ? incrNextAcc - positions.length
          : incrNextAcc;
      chordPositions.push(nextAcc);
    }

    const truePositions = chordPositions.map((p) => positions[p]);
    acc = acc + 1 === positions.length ? 0 : acc + 1;
    foundChords.push(
      chords.find(
        (chord) => chord.positions.join("") === truePositions.join("")
      )!
    );
  }

  return foundChords;
};

const pickOtherChords = (
  baseScaleChords: Chord[],
  chords: Chord[]
): Chord[] => {
  const newChords: Chord[] = [];

  for (let i = 0; i < chords.length; i++) {
    const positions = chords[i].positions.join("");

    const isInBaseScaleChords = baseScaleChords.some(
      (c) => c.positions.join("") === positions
    );

    if (!isInBaseScaleChords) {
      newChords.push(chords[i]);
    }
  }

  return newChords;
};

const swapPositionsByIdx = (
  positions: NotePosition[],
  idx: number
): NotePosition[] => {
  const unique = uniq(positions);
  const head = unique.filter((_, currIdx) => currIdx >= idx);
  const tail = unique.filter((pos) => !head.includes(pos));

  return [...head, ...tail];
};

const ChordsGrid = ({
  chords,
  pickedChords,
  notation,
  usedScales,
  automaticChordsChangeLoading,
  automaticChords,
  bpm,
  automaticChordsChangeOff,
  onPlayNoteClick,
  onAutomaticChordsChange,
  onChordClick,
  onBpmChange,
}: ChordsGridProps) => {
  const [activeUsedScale, setActiveUsedScale] = useState<number>(-1);

  const { t } = useTranslation();

  useEffect(() => {
    if (usedScales.length > 0) {
      setActiveUsedScale(0);
    }
  }, [usedScales]);

  const baseScaleChords = useMemo(
    () =>
      activeUsedScale > -1
        ? takeScaleBaseChords(chords, usedScales[activeUsedScale])
        : [],
    [chords, activeUsedScale, usedScales]
  );

  const otherChords = useMemo(
    () =>
      activeUsedScale > -1 ? pickOtherChords(baseScaleChords, chords) : [],
    [chords, baseScaleChords]
  );

  return (
    <div className={css.root}>
      <section className={css.section}>
        <Title className={css.title} level={3}>
          {t(usedScales.length > 1 ? "Found scales" : "Found scale")}
        </Title>
        <div className={css.tags}>
          {usedScales.map((scale, idx) => (
            <Tag
              className={css.tag}
              color={activeUsedScale === idx ? "green" : "geekblue"}
              key={idx}
              onClick={() => setActiveUsedScale(idx)}
            >
              {getNoteName(notation, scale.key)} {scale.type}
            </Tag>
          ))}
        </div>
      </section>

      {usedScales[activeUsedScale] && (
        <section className={css.section}>
          <Title className={css.title} level={5}>
            {t("Scale modes")}
          </Title>

          <div className={css.flex}>
            {usedScales[activeUsedScale].modes.map((mode, idx) => (
              <Tooltip
                key={mode.name}
                title={
                  t("Pattern") +
                  ": " +
                  mode.pattern.map(
                    (pattern) => SCALE_INTERVAL_NOTATION_DICT[pattern]
                  )
                }
              >
                <Tag color="geekblue">
                  {mode.name}{" "}
                  {swapPositionsByIdx(
                    usedScales[activeUsedScale].positions,
                    idx
                  )
                    .map((position) => getNoteName(notation, position))
                    .join(",")}
                </Tag>
              </Tooltip>
            ))}
          </div>
        </section>
      )}

      <section className={css.section}>
        <div className={css.toolbox}>
          <Title className={css.title} level={5}>
            {t("Chords built on a scale steps")}
          </Title>

          <Tooltip
            title={t(
              automaticChordsChangeOff
                ? "At least one chord must be selected to use this option"
                : "Enables or disables the automatic chord visualization"
            )}
          >
            <Switch
              className={css.switch}
              loading={automaticChordsChangeLoading}
              disabled={automaticChordsChangeOff}
              checked={automaticChords}
              checkedChildren={t("Automatic chords visualization on")}
              unCheckedChildren={t("Automatic chords visualization off")}
              onChange={onAutomaticChordsChange}
            />
          </Tooltip>
        </div>

        <Slider
          disabled={automaticChordsChangeLoading}
          min={MIN_ALLOWED_BPM}
          max={MAX_ALLOWED_BPM}
          value={bpm}
          onChange={onBpmChange}
        />

        <div className={css.grid}>
          {baseScaleChords.map((chord, idx) => (
            <Card
              key={chord.id}
              className={css.card}
              size="small"
              title={
                <Tooltip title={t("Show on fretboard")}>
                  <Checkbox
                    className={css.checkbox}
                    checked={!!pickedChords[chord.id]}
                    onChange={() => onChordClick(chord)}
                  >
                    {getNoteName(notation, chord.rootPosition)}{" "}
                    {chord.type === ChordType.Major ||
                    chord.type === ChordType.Minor
                      ? t(chord.type)
                      : chord.symbol}
                    <ChordInScaleSymbol symbol={chord.symbol} value={idx} />
                  </Checkbox>
                </Tooltip>
              }
            >
              <div className={css.listItemContent}>
                {chord.positions
                  .map((position) => getNoteName(notation, position))
                  .join(",")}

                <PlayManyButton
                  className={css.play}
                  onClick={() => onPlayNoteClick(chord)}
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {otherChords.length > 0 && (
        <section className={css.section}>
          <Title className={css.title} level={5}>
            {t("Other chords")}
          </Title>

          <div className={css.grid}>
            {otherChords.map((chord) => (
              <Card
                key={chord.id}
                className={css.card}
                size="small"
                title={
                  <Tooltip title={t("Show on fretboard")}>
                    <Checkbox
                      className={css.checkbox}
                      checked={!!pickedChords[chord.id]}
                      onChange={() => onChordClick(chord)}
                    >
                      {getNoteName(notation, chord.rootPosition)}{" "}
                      {chord.type === ChordType.Major ||
                      chord.type === ChordType.Minor
                        ? t(chord.type)
                        : chord.symbol}
                    </Checkbox>
                  </Tooltip>
                }
              >
                <div className={css.listItemContent}>
                  {chord.positions
                    .map((position) => getNoteName(notation, position))
                    .join(",")}

                  <PlayManyButton
                    className={css.play}
                    onClick={() => onPlayNoteClick(chord)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export { ChordsGrid };
