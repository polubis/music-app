import { Button, Tooltip } from "antd";
import { useToggle, withLazy } from "dk";
import { useTranslation } from "react-i18next";
import {
  GuitarStringTuning,
  NoteNotation,
  DescribedGuitarStringTuning,
} from "../models";

export interface TuningPickerProps {
  className?: string;
  notation: NoteNotation;
  tunings: DescribedGuitarStringTuning[];
  tuning: GuitarStringTuning[];
  onChange: (tuning: GuitarStringTuning[]) => void;
  onPlay: () => void;
}

const TuningPickerModal = withLazy(() =>
  import("./TuningPickerModal").then((m) => ({ default: m.TuningPickerModal }))
);

const TuningPicker = ({
  className = "",
  notation,
  tuning,
  tunings,
  onChange,
  onPlay,
}: TuningPickerProps) => {
  const { t } = useTranslation();
  const [isOpen, { open, close }] = useToggle();

  return (
    <div className={className}>
      <Tooltip title={t("TuningTooltip")}>
        <Button type="primary" onClick={open}>
          {t("Tuning")}
        </Button>
      </Tooltip>

      {isOpen && (
        <TuningPickerModal
          tuning={tuning}
          notation={notation}
          tunings={tunings}
          onOk={close}
          onChange={onChange}
          onCancel={close}
          onPlay={onPlay}
        />
      )}
    </div>
  );
};

export { TuningPicker };
