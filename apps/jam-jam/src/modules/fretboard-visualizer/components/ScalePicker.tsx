import { Button, Tooltip } from "antd";
import { useToggle } from "dk";

import { KeyedNamedScale, NoteNotation, NotePosition } from "../models";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";

interface ScalePickerProps {
  hiddenPositions: NotePosition[];
  notation: NoteNotation;
  usedScale: KeyedNamedScale | undefined;
  onChange: (positions: NotePosition[]) => void;
  onPlay: (positions: NotePosition[]) => void;
}

const ScalePickerModal = loadable(() => import("./ScalePickerModal"), {
  resolveComponent: (imported) => imported.ScalePickerModal,
});

const ScalePicker = ({
  hiddenPositions,
  notation,
  usedScale,
  onChange,
  onPlay,
}: ScalePickerProps) => {
  const [isOpen, { open, close }] = useToggle();
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t("Displays scales on fretboard")}>
        <Button type="primary" onClick={open}>
          {t("Pick notes by scales")}
        </Button>
      </Tooltip>

      {isOpen && (
        <ScalePickerModal
          usedScale={usedScale}
          hiddenPositions={hiddenPositions}
          onChange={onChange}
          notation={notation}
          onOk={close}
          onCancel={close}
          onPlay={onPlay}
        />
      )}
    </>
  );
};

export { ScalePicker };
