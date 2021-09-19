import { Button } from "antd";
import { useToggle } from "dk";
import React from "react";

import { ScalePickerModal } from "./ScalePickerModal";
import { NoteNotation, NotePosition } from "../models";

import css from "./ScalePicker.scss";

interface ScalePickerProps {
  className?: string;
  hiddenPositions: NotePosition[];
  notation: NoteNotation;
  onChange: (positions: NotePosition[]) => void;
}

const ScalePicker = ({
  hiddenPositions,
  className = "",
  notation,
  onChange,
}: ScalePickerProps) => {
  const [isOpen, { open, close }] = useToggle();

  return (
    <div className={className}>
      <Button type="primary" onClick={open}>
        Pick scale
      </Button>

      {isOpen && (
        <ScalePickerModal
          hiddenPositions={hiddenPositions}
          onChange={onChange}
          notation={notation}
          onOk={close}
          onCancel={close}
        />
      )}
    </div>
  );
};

export { ScalePicker };