import { Button, Tooltip } from "antd";
import { useToggle } from "dk";

import { KeyedNamedScale, NoteNotation, NotePosition } from "../models";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";

interface ScalePickerProps {
  className?: string;
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
  className = "",
  notation,
  usedScale,
  onChange,
  onPlay,
}: ScalePickerProps) => {
  const [isOpen, { open, close }] = useToggle();
  const { t } = useTranslation();

  return (
    <div className={className}>
      <Tooltip title={t("Displays scales on fretboard")}>
        <Button type="primary" onClick={open}>
          {t("Scales")}
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
    </div>
  );
};

export { ScalePicker };
