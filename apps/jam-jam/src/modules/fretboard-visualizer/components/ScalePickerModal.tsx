import { Modal, Select, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { NoteButton } from "./NoteButton";
import {
  NOTES_POSITIONS,
  FIRST_NOTE_POSITION,
  getNoteName,
  NoteNotation,
  NotePosition,
  ScaleType,
  SCALES,
  createKeyedScale,
  KeyedScale,
  SCALE_INTERVAL_NOTATION_DICT,
} from "../models";

import css from "./ScalePickerModal.scss";

interface ScalePickerModalProps {
  notation: NoteNotation;
  hiddenPositions: NotePosition[];
  onOk: () => void;
  onChange: (positions: NotePosition[]) => void;
  onCancel: () => void;
}

const { Option } = Select;
const { Title } = Typography;

interface ScalePickerModalFormData {
  key: NotePosition;
  type: ScaleType;
}

const pickScale = (formData: ScalePickerModalFormData): KeyedScale => {
  return createKeyedScale(
    formData.key,
    SCALES.find(({ type }) => type === formData.type)!
  );
};

const ScalePickerModal = ({
  notation,
  onCancel,
  hiddenPositions,
  onOk,
  onChange,
}: ScalePickerModalProps) => {
  const memoizedHiddenPositions = useMemo(() => hiddenPositions, []);
  const [formData, setFormData] = useState<ScalePickerModalFormData>({
    key: FIRST_NOTE_POSITION,
    type: ScaleType.Major,
  });
  const [pickedScale, setPickedScale] = useState(pickScale(formData));

  const handleKeyChange = (key: NotePosition): void => {
    const newFormData: ScalePickerModalFormData = {
      ...formData,
      key,
    };
    const pickedScale = pickScale(newFormData);
    setFormData(newFormData);
    setPickedScale(pickedScale);
  };

  const handleTypeChange = (type: ScaleType): void => {
    const newFormData: ScalePickerModalFormData = {
      ...formData,
      type,
    };
    const pickedScale = pickScale(newFormData);
    setFormData(newFormData);
    setPickedScale(pickedScale);
  };

  const handleCancel = (): void => {
    onChange(
      NOTES_POSITIONS.filter(
        (position) => !memoizedHiddenPositions.includes(position)
      )
    );
    onCancel();
  };

  useEffect(() => {
    onChange(pickedScale.positions);
  }, [pickedScale]);

  return (
    <Modal
      title="Pick scale"
      visible
      okText="Apply"
      onOk={onOk}
      onCancel={handleCancel}
    >
      <div className={css.row}>
        <Title level={5}>Scale key</Title>
        <Select
          value={formData.key}
          style={{ width: "100%" }}
          onChange={handleKeyChange}
        >
          {NOTES_POSITIONS.map((position) => (
            <Option key={position} value={position}>
              {getNoteName(notation, position)}
            </Option>
          ))}
        </Select>
      </div>
      <div className={css.row}>
        <Title level={5}>Scale type</Title>
        <Select
          value={formData.type}
          style={{ width: "100%" }}
          onChange={handleTypeChange}
        >
          {SCALES.map((scale) => (
            <Option key={scale.type} value={scale.type}>
              {scale.type}:{" "}
              {scale.pattern
                .map((position) => SCALE_INTERVAL_NOTATION_DICT[position])
                .join(",")}
            </Option>
          ))}
        </Select>
      </div>
      <div className={css.preview}>
        {pickedScale.positions.map((position, idx) => (
          <NoteButton key={idx} position={position} notation={notation} />
        ))}
      </div>
    </Modal>
  );
};

export { ScalePickerModal };
