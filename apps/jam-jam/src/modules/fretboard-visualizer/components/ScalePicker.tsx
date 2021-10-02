import { Button, Tooltip } from "antd";
import { useToggle } from "dk";

import { ScalePickerModal } from "./ScalePickerModal";
import { NoteNotation, NotePosition } from "../models";
import { useTranslation } from "react-i18next";

interface ScalePickerProps {
  className?: string;
  hiddenPositions: NotePosition[];
  notation: NoteNotation;
  onChange: (positions: NotePosition[]) => void;
  onPlay: (positions: NotePosition[]) => void;
}

const ScalePicker = ({
  hiddenPositions,
  className = "",
  notation,
  onChange,
  onPlay,
}: ScalePickerProps) => {
  const [isOpen, { open, close }] = useToggle();
  const { t } = useTranslation();

  return (
    <div className={className}>
      <Tooltip title={t("ScalesTooltip")}>
        <Button type="primary" onClick={open}>
          {t("Scales")}
        </Button>
      </Tooltip>

      {isOpen && (
        <ScalePickerModal
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
