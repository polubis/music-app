import { Button, Modal, Select, Tooltip, Form } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
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
  getTuningName,
} from "../models";

import css from "./TuningPickerModal.module.less";
import { PlayManyButton } from "./PlayManyButton";
import { useTranslation } from "react-i18next";

const { Item } = Form;

interface TuningPickerModalProps {
  notation: NoteNotation;
  tunings: DescribedGuitarStringTuning[];
  tuning: GuitarStringTuning[];
  onChange: (tuning: GuitarStringTuning[]) => void;
  onOk: () => void;
  onCancel: () => void;
  onPlay: () => void;
}

const { Option, OptGroup } = Select;

interface TuningPickerModalFormData {
  tuning: GuitarStringTuning[];
}

const TuningPickerModal = ({
  notation,
  tuning,
  tunings,
  onChange,
  onOk,
  onCancel,
  onPlay,
}: TuningPickerModalProps) => {
  const { t } = useTranslation();
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

    newFormData.tuning.push({
      octave: formData.tuning[formData.tuning.length - 1].octave,
      id: formData.tuning[formData.tuning.length - 1].id + 1,
      position: 0,
    });

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

  const handleOk = (): void => {
    onChange(formData.tuning);
    onOk();
  };

  const groupedTunings = useMemo(() => groupTunings(tunings), [tunings]);

  const selectValue = useMemo(
    () => getTuningName(notation, tunings, formData.tuning),
    [formData, tunings, notation]
  );

  return (
    <Modal
      title={t("EditTuning")}
      visible
      okText={t("Apply")}
      cancelText={t("Cancel")}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Item label={t("CommonTunings")}>
          <Select
            value={selectValue}
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
                      .reverse()
                      .join(",")}
                    )
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        </Item>
      </Form>

      {formData.tuning.map(({ position, id }, itemIdx) => (
        <Item key={id} label={`${t("String")} ${id + 1}`}>
          <Select
            value={position}
            style={{ width: 120, marginLeft: "6px" }}
            onChange={(pickedPosition) => handleSelect(pickedPosition, id)}
          >
            {NOTES_POSITIONS.map((position) => (
              <Option key={position} value={position}>
                {getNoteName(notation, position)}
              </Option>
            ))}
          </Select>
          {itemIdx === formData.tuning.length - 1 && (
            <Tooltip title={t("RemoveString")}>
              <Button
                className={css.removeStringBtn}
                type="ghost"
                disabled={formData.tuning.length === MIN_STRINGS_COUNT}
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteString(id)}
              />
            </Tooltip>
          )}
        </Item>
      ))}
      <Button
        type="primary"
        className={css.addStringBtn}
        disabled={formData.tuning.length === MAX_STRINGS_COUNT}
        icon={<PlusCircleOutlined />}
        onClick={handleAddString}
        style={{ marginRight: "15px" }}
      >
        {t("AddString")}
      </Button>

      <PlayManyButton onClick={onPlay} />
    </Modal>
  );
};

export { TuningPickerModal };
