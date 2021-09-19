import { Button, Modal, Typography, Select, Tooltip } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import {
  GuitarStringTuning,
  NoteNotation,
  getNoteName,
  NOTES_POSITIONS,
  MIN_STRINGS_COUNT,
  MAX_STRINGS_COUNT,
  NotePosition,
  DescribedGuitarStringTuning,
  groupTunings,
} from "../models";

import css from "./TuningPickerModal.scss";

interface TuningPickerModalProps {
  currentTuningName: string;
  notation: NoteNotation;
  tunings: DescribedGuitarStringTuning[];
  tuning: GuitarStringTuning[];
  isLeftOrientation: boolean;
  onChange: (tuning: GuitarStringTuning[]) => void;
  onOk: () => void;
  onCancel: () => void;
}

const { Title } = Typography;
const { Option, OptGroup } = Select;

interface TuningPickerModalFormData {
  tuning: GuitarStringTuning[];
}

const TuningPickerModal = ({
  currentTuningName,
  notation,
  tuning,
  tunings,
  isLeftOrientation,
  onChange,
  onOk,
  onCancel,
}: TuningPickerModalProps) => {
  const initTuning = useMemo(() => tuning, []);
  const [formData, setFormData] = useState<TuningPickerModalFormData>({
    tuning: [...initTuning],
  });

  const handleSelect = (position: NotePosition, id: number): void => {
    const newFormData: TuningPickerModalFormData = {
      ...formData,
      tuning: formData.tuning.map((item) =>
        item.id === id
          ? {
              ...item,
              position,
            }
          : item
      ),
    };

    setFormData(newFormData);
    onChange(newFormData.tuning);
  };

  const handleCancel = (): void => {
    onChange(initTuning);
    onCancel();
  };

  const handleAddString = (): void => {
    // TODO: Add octave calculations later
    const newFormData: TuningPickerModalFormData = {
      ...formData,
      tuning: [...formData.tuning],
    };

    if (isLeftOrientation) {
      newFormData.tuning.unshift({
        octave: formData.tuning[0].octave,
        id: formData.tuning[0].id + 1,
        position: 0,
      });
    } else {
      newFormData.tuning.push({
        octave: formData.tuning[formData.tuning.length - 1].octave,
        id: formData.tuning[formData.tuning.length - 1].id + 1,
        position: 0,
      });
    }

    setFormData(newFormData);
    onChange(newFormData.tuning);
  };

  const handleDeleteString = (id: number): void => {
    const newFormData: TuningPickerModalFormData = {
      ...formData,
      tuning: formData.tuning.filter((item) => item.id !== id),
    };
    setFormData(newFormData);
    onChange(newFormData.tuning);
  };

  const handleCommonTuningSelect = (name: string): void => {
    const foundTuning = tunings.find((item) => item.name === name);

    if (foundTuning === undefined) {
      throw new Error("handleCommonTuningSelect() [CANNOT_FIND_COMMON_TUNING]");
    }

    const newFormData: TuningPickerModalFormData = {
      ...formData,
      tuning: foundTuning.tuning,
    };
    setFormData(newFormData);
    onChange(newFormData.tuning);
  };

  const groupedTunings = useMemo(() => groupTunings(tunings), [tunings]);

  return (
    <Modal
      title="Edit tuning"
      visible
      okText="Apply"
      onOk={onOk}
      onCancel={handleCancel}
    >
      <div className={css.row}>
        <Title level={5}>Common tunings</Title>
        <Select
          value={currentTuningName}
          className={css.commonTuningSelect}
          onChange={handleCommonTuningSelect}
        >
          {Object.entries(groupedTunings).map(([category, tunings]) => (
            <OptGroup label={category} key={category}>
              {tunings.map(({ name, tuning }) => (
                <Option key={name} value={name}>
                  {name}: (
                  {tuning
                    .map((item) => getNoteName(notation, item.position))
                    .join(",")}
                  )
                </Option>
              ))}
            </OptGroup>
          ))}
        </Select>
      </div>

      {formData.tuning.map(({ position, id }, itemIdx) => (
        <div className={css.row} key={id}>
          <Title level={5}>String {id + 1}</Title>
          <Select
            value={position}
            style={{ width: 120 }}
            onChange={(pickedPosition) => handleSelect(pickedPosition, id)}
          >
            {NOTES_POSITIONS.map((position) => (
              <Option key={position} value={position}>
                {getNoteName(notation, position)}
              </Option>
            ))}
          </Select>
          {(isLeftOrientation
            ? itemIdx === 0
            : itemIdx === formData.tuning.length - 1) && (
            <Tooltip title="Remove string">
              <Button
                type="ghost"
                disabled={formData.tuning.length === MIN_STRINGS_COUNT}
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteString(id)}
              />
            </Tooltip>
          )}
        </div>
      ))}
      <Button
        type="primary"
        className={css.addStringBtn}
        disabled={formData.tuning.length === MAX_STRINGS_COUNT}
        icon={<PlusCircleOutlined />}
        onClick={handleAddString}
      >
        Add string
      </Button>
    </Modal>
  );
};

export { TuningPickerModal };
