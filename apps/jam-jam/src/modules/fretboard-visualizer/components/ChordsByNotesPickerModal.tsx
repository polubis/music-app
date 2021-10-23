import { Card, Typography } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Modal from "antd/lib/modal/Modal";
import { Fragment, useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import {
  Chord,
  ChordType,
  getNoteName,
  NoteNotation,
  NotePosition,
  NOTES_POSITIONS,
} from "../models";
import {
  AUGMENTED_CHORDS,
  DIMINISHED_CHORDS,
  MAJOR_CHORDS,
  MINOR_CHORDS,
} from "../models/chord";
import { PlayManyButton } from "./PlayManyButton";

import css from "./ChordsByNotesPickerModal.module.less";
import { useMemo } from "react";
import { uniq } from "lodash";

interface ChordsByNotesPickerModalProps {
  notation: NoteNotation;
  hiddenPositions: NotePosition[];
  onOk: () => void;
  onCancel: () => void;
  onChange: (positions: NotePosition[]) => void;
  onPlayChord: (chord: Chord) => void;
}

type PickedChords = Record<string, Chord | undefined>;

const { Title } = Typography;

const ChordsList = (
  chords: Chord[],
  type: ChordType,
  notation: NoteNotation,
  t: TFunction<"translation">,
  pickedChords: PickedChords,
  onChordClick: (chord: Chord) => void,
  onPlayNote: (chord: Chord) => void
) => {
  return (
    <div className={css.listContainer}>
      <Title level={5}>{t(`${type} chords`)}</Title>

      <div className={css.list}>
        {chords.map((chord) => (
          <Card
            key={chord.rootPosition}
            size="small"
            title={
              <Checkbox
                checked={!!pickedChords[chord.id]}
                onChange={() => onChordClick(chord)}
              >
                {getNoteName(notation, chord.rootPosition)}{" "}
                {chord.type === ChordType.Major ||
                chord.type === ChordType.Minor
                  ? t(chord.type)
                  : chord.symbol}
              </Checkbox>
            }
          >
            <div className={css.listItemContent}>
              {chord.positions
                .map((position) => getNoteName(notation, position))
                .join(",")}

              <PlayManyButton
                className={css.play}
                onClick={() => onPlayNote(chord)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface GroupedChord {
  type: ChordType;
  chords: Chord[];
}

const GROUPED_CHORDS: GroupedChord[] = [
  {
    chords: MAJOR_CHORDS,
    type: ChordType.Major,
  },
  {
    chords: MINOR_CHORDS,
    type: ChordType.Minor,
  },
  {
    chords: AUGMENTED_CHORDS,
    type: ChordType.Augmented,
  },
  {
    chords: DIMINISHED_CHORDS,
    type: ChordType.Diminished,
  },
];

const ChordsByNotesPickerModal = ({
  notation,
  hiddenPositions,
  onOk,
  onCancel,
  onPlayChord,
  onChange,
}: ChordsByNotesPickerModalProps) => {
  const memoizedHiddenPositions = useMemo(() => hiddenPositions, []);

  const [pickedChords, setPickedChords] = useState<PickedChords>({});

  const { t } = useTranslation();

  const handleCancel = (): void => {
    onChange(memoizedHiddenPositions);
    onCancel();
  };

  const handleOk = (): void => {
    onOk();
  };

  const handleChordClick = (chord: Chord): void => {
    const newPickedChords = {
      ...pickedChords,
      [chord.id]: pickedChords[chord.id] !== undefined ? undefined : chord,
    };

    const isChord = (chord: Chord | undefined): chord is Chord =>
      chord !== undefined;

    const unique = uniq(
      Object.values(newPickedChords)
        .filter(isChord)
        .flatMap((chord) => chord.positions)
    );

    setPickedChords(newPickedChords);

    onChange(NOTES_POSITIONS.filter((pos) => !unique.includes(pos)));
  };

  const handlePlayChord = (chord: Chord): void => {
    onPlayChord(chord);
  };

  return (
    <Modal
      title={t("Pick notes by chords")}
      visible
      okText={t("Apply")}
      cancelText={t("Cancel")}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {GROUPED_CHORDS.map((group) => (
        <Fragment key={group.type}>
          {ChordsList(
            group.chords,
            group.type,
            notation,
            t,
            pickedChords,
            handleChordClick,
            handlePlayChord
          )}
        </Fragment>
      ))}
    </Modal>
  );
};

export { ChordsByNotesPickerModal };
