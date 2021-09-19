import { Modal, Select, Form } from "antd";
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
  Scale,
  ScaleMode,
  SCALE_INTERVAL_NOTATION_DICT,
} from "../models";

import css from "./ScalePickerModal.module.less";

interface ScalePickerModalProps {
  notation: NoteNotation;
  hiddenPositions: NotePosition[];
  onOk: () => void;
  onChange: (positions: NotePosition[]) => void;
  onCancel: () => void;
}

const { Option } = Select;
const { Item } = Form;

interface ScalePickerModalFormData {
  key: NotePosition;
  type: ScaleType;
  modeName: string;
}

const findScale = (type: ScaleType): Scale => {
  const foundScale = SCALES.find((scale) => scale.type === type);

  if (foundScale === undefined) {
    throw new Error("findScale() [SCALE_NOT_FOUND]");
  }

  return foundScale;
};

const findMode = (modes: ScaleMode[], modeName: string): ScaleMode => {
  const foundMode = modes.find((mode) => mode.name === modeName);

  if (foundMode === undefined) {
    throw new Error("pickScale() [MODE_IN_SCALE_NOT_FOUND]");
  }

  return foundMode;
};

const pickScale = (formData: ScalePickerModalFormData): KeyedScale => {
  const foundScale = findScale(formData.type);
  const foundMode = findMode(foundScale.modes, formData.modeName);
  return createKeyedScale(formData.key, foundScale, foundMode);
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
    modeName: SCALES[0].modes[0].name,
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
    const foundScale = findScale(type);
    const newFormData: ScalePickerModalFormData = {
      ...formData,
      type,
      modeName: findMode(foundScale.modes, foundScale.modes[0].name).name,
    };
    const pickedScale = pickScale(newFormData);
    setFormData(newFormData);
    setPickedScale(pickedScale);
  };

  const handleModeChange = (modeName: string): void => {
    const newFormData: ScalePickerModalFormData = {
      ...formData,
      modeName,
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
      <Form layout="vertical">
        <Item label="Scale key">
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
        </Item>
        <Item label="Scale type">
          <Select
            value={formData.type}
            style={{ width: "100%" }}
            onChange={handleTypeChange}
          >
            {SCALES.map((scale) => (
              <Option key={scale.type} value={scale.type}>
                {scale.type}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="Scale mode">
          <Select
            value={formData.modeName}
            style={{ width: "100%" }}
            onChange={handleModeChange}
          >
            {pickedScale.modes.map((mode) => (
              <Option key={mode.name} value={mode.name}>
                {mode.name}:{" "}
                {mode.pattern
                  .map((position) => SCALE_INTERVAL_NOTATION_DICT[position])
                  .join(",")}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="Preview">
          <div className={css.preview}>
            {pickedScale.positions.map((position, idx) => (
              <NoteButton
                className={css.previewBtn}
                key={idx}
                position={position}
                notation={notation}
              />
            ))}
          </div>
        </Item>
      </Form>
    </Modal>
  );
};

export { ScalePickerModal };
