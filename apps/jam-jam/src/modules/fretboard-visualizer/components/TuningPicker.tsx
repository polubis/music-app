import { Button } from "antd";
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
  currentTuningName: string;
  onChange: (tuning: GuitarStringTuning[]) => void;
}

const TuningPicker = ({
  className = "",
  notation,
  tuning,
  tunings,
  currentTuningName,
  onChange,
}: TuningPickerProps) => {
  const [isOpen, { open, close }] = useToggle();

  return (
    <div className={className}>
      <Button type="primary" onClick={open}>
        Tuning
      </Button>
      {isOpen && (
        <TuningPickerModal
          tuning={tuning}
          notation={notation}
          tunings={tunings}
          currentTuningName={currentTuningName}
          onOk={close}
          onChange={onChange}
          onCancel={close}
        />
      )}
    </div>
  );
};

export { TuningPicker };
