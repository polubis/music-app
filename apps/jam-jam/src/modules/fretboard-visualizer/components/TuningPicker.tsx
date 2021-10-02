import { Button, Tooltip } from "antd";
import { useToggle } from "dk";
import {
  GuitarStringTuning,
  NoteNotation,
  DescribedGuitarStringTuning,
} from "../models";

import { TuningPickerModal } from "./TuningPickerModal";

export interface TuningPickerProps {
  className?: string;
  notation: NoteNotation;
  tunings: DescribedGuitarStringTuning[];
  tuning: GuitarStringTuning[];
  onChange: (tuning: GuitarStringTuning[]) => void;
  onPlay: () => void;
}

const TuningPicker = ({
  className = "",
  notation,
  tuning,
  tunings,
  onChange,
  onPlay,
}: TuningPickerProps) => {
  const [isOpen, { open, close }] = useToggle();

  return (
    <div className={className}>
      <Tooltip title="Allows to customize guitar tuning">
        <Button type="primary" onClick={open}>
          Tuning
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
