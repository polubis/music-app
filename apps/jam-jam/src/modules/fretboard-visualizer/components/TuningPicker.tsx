import { Button } from "antd";
import React, { useMemo } from "react";
import { useToggle } from "dk";
import {
  GuitarStringTuning,
  NoteNotation,
  getTuningName,
  DescribedGuitarStringTuning,
} from "../models";

import { TuningPickerModal } from "./TuningPickerModal";

export interface TuningPickerProps {
  notation: NoteNotation;
  tunings: DescribedGuitarStringTuning[];
  tuning: GuitarStringTuning[];
  isLeftOrientation: boolean;
  onChange: (tuning: GuitarStringTuning[]) => void;
}

const TuningPicker = ({
  notation,
  tuning,
  tunings,
  isLeftOrientation,
  onChange,
}: TuningPickerProps) => {
  const [isOpen, { open, close }] = useToggle();

  const currentTuningName = useMemo(
    () => getTuningName(notation, tunings, tuning),
    [notation, tunings, tuning]
  );

  return (
    <>
      <Button type="primary" onClick={open}>
        {currentTuningName}
      </Button>
      {isOpen && (
        <TuningPickerModal
          tuning={tuning}
          notation={notation}
          tunings={tunings}
          isLeftOrientation={isLeftOrientation}
          currentTuningName={currentTuningName}
          onOk={close}
          onChange={onChange}
          onCancel={close}
        />
      )}
    </>
  );
};

export { TuningPicker };
