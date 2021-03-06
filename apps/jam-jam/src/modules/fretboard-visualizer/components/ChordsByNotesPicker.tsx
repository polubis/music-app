import loadable from "@loadable/component";
import { Button } from "antd";
import { useToggle } from "dk";
import { useTranslation } from "react-i18next";
import { Chord, NoteNotation, NotePosition } from "../models";

interface ChordsByNotesPickerProps {
  notation: NoteNotation;
  hiddenPositions: NotePosition[];
  onChange: (positions: NotePosition[]) => void;
  onPlayChord: (chord: Chord) => void;
}

const ChordsByNotesPickerModal = loadable(
  () => import("./ChordsByNotesPickerModal"),
  {
    resolveComponent: (imported) => imported.ChordsByNotesPickerModal,
  }
);

const ChordsByNotesPicker = ({
  notation,
  hiddenPositions,
  onChange,
  onPlayChord,
}: ChordsByNotesPickerProps) => {
  const [isOpen, { open, close }] = useToggle();
  const { t } = useTranslation();

  return (
    <>
      <Button type="primary" onClick={open}>
        {t("Pick notes by chords")}
      </Button>

      {isOpen && (
        <ChordsByNotesPickerModal
          hiddenPositions={hiddenPositions}
          notation={notation}
          onOk={close}
          onCancel={close}
          onChange={onChange}
          onPlayChord={onPlayChord}
        />
      )}
    </>
  );
};

export { ChordsByNotesPicker };
