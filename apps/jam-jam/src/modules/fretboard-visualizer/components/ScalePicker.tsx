import { Button, Tooltip } from "antd";
import { useToggle } from "dk";

import { ScalePickerModal } from "./ScalePickerModal";
import { NoteNotation, NotePosition } from "../models";

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
      <Tooltip title="Displays scale on fretboard">
        <Button type="primary" onClick={open}>
          Scales
        </Button>
      </Tooltip>

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
