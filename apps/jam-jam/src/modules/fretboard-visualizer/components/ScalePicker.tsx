import { Button, Tooltip } from "antd";
import { useToggle, withLazy } from "dk";

import {
  getNoteName,
  KeyedNamedScale,
  NoteNotation,
  NotePosition,
} from "../models";
import { useTranslation } from "react-i18next";

interface ScalePickerProps {
  className?: string;
  hiddenPositions: NotePosition[];
  notation: NoteNotation;
  usedScale: KeyedNamedScale | undefined;
  onChange: (positions: NotePosition[]) => void;
  onPlay: (positions: NotePosition[]) => void;
}

const ScalePickerModal = withLazy(() =>
  import("./ScalePickerModal").then((m) => ({ default: m.ScalePickerModal }))
);

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
      <Tooltip
        title={
          usedScale
            ? t("PickedScale", {
                key: getNoteName(notation, usedScale.key),
                type: usedScale.type,
              })
            : t("ScalesTooltip")
        }
      >
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
