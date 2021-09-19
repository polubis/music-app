import { Button } from "antd";
import React, { useMemo, useState } from "react";
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const currentTuningName = useMemo(
    () => getTuningName(notation, tunings, tuning),
    [notation, tunings, tuning]
  );

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {currentTuningName}
      </Button>
      {isModalVisible && (
        <TuningPickerModal
          tuning={tuning}
          notation={notation}
          tunings={tunings}
          isLeftOrientation={isLeftOrientation}
          currentTuningName={currentTuningName}
          onOk={handleOk}
          onChange={onChange}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export { TuningPicker };
