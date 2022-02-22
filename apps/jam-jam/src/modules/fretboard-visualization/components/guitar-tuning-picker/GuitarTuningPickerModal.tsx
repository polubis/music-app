import { Button, Modal, Form, Select, InputNumber, Input } from "antd";
import {
  GuitarNote,
  MAX_OCTAVE,
  MIN_OCTAVE,
  NoteNotationSymbol,
  OCTAVES,
  POSITIONS,
  NoteSymbol,
  NoteOctave,
  NoteId,
  StringInstrumentTuning,
  Note,
  Guitar,
  StringInstrumentTuningType,
  getSharpName,
} from "music-core";
import { useGuitarTuningsProvider } from "../../providers";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import css from "./GuitarTuningPickerModal.module.less";
import createForm from "io-form";
import { CloseOutlined } from "@ant-design/icons";

interface GuitarTuningPickerModalProps {
  initData?: StringInstrumentTuning;
  onCancel: () => void;
  onSubmit: (data: StringInstrumentTuning) => void;
}

const { Option } = Select;

const NOTES = POSITIONS.map(
  (position) => new GuitarNote(getSharpName(position), OCTAVES[4], position)
);

const GuitarTuningPickerModal = ({
  initData,
  onCancel,
  onSubmit,
}: GuitarTuningPickerModalProps) => {
  const { E_STANDARD } = useGuitarTuningsProvider();

  const [form, setForm] = useState(
    createForm<StringInstrumentTuning>(
      initData ?? {
        ...E_STANDARD,
        id: new Date().toString(),
        name: "My tuning",
        type: StringInstrumentTuningType.Custom,
      },
      {
        name: [(value) => value.length < 3 || value.length > 20],
      }
    )
  );

  const { t } = useTranslation();

  const updateTuningNote = (newNote: Partial<Note>, id: NoteId): void => {
    setForm(
      form.next({
        notes: form.values.notes.map((note) =>
          note.id === id ? { ...note, ...newNote } : note
        ),
      })
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm(form.next({ name: e.target.value }));
  };

  const handleNoteChange = (symbol: NoteSymbol, id: NoteId): void => {
    updateTuningNote({ symbol }, id);
  };

  const handleOctaveChange = (octave: NoteOctave, id: NoteId): void => {
    updateTuningNote({ octave }, id);
  };

  const handleNoteDelete = (id: NoteId): void => {
    setForm(
      form.next({
        notes: form.values.notes.filter((note) => note.id !== id),
      })
    );
  };

  const handleAddString = (): void => {
    setForm(
      form.next({
        notes: [
          ...form.values.notes,
          new GuitarNote("B", 2, form.values.notes.length + 1),
        ],
      })
    );
  };

  const handleCancel = (): void => {
    onCancel();
  };

  const handleSubmit = (): void => {
    const result = form.submit();

    if (!result.invalid) {
      onSubmit(result.values);
    }

    setForm(result);
  };

  const { errors, invalid, dirty, values } = form;

  const isNameError = dirty && errors.name;

  return (
    <Modal
      title={t(
        initData ? "Edit tuning " + initData.name : "Create your own tuning"
      )}
      visible
      onCancel={handleCancel}
      footer={[
        <Button key="0" type="primary" ghost onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="1"
          type="primary"
          disabled={dirty && invalid}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item
          name="name"
          initialValue={values.name}
          label={t("Tuning name")}
          validateStatus={isNameError ? "error" : undefined}
          help={
            isNameError
              ? t("Tuning name field does not match the criteria")
              : ""
          }
        >
          <Input
            placeholder={t("Type tuning name...")}
            value={values.name}
            onChange={handleNameChange}
          />
        </Form.Item>

        {values.notes.map((note, idx) => (
          <Form.Item label={`${t("String")} ${idx + 1}:`} key={note.id}>
            <div className={css.row}>
              <Select
                value={note.symbol}
                onChange={(symbol) => handleNoteChange(symbol, note.id)}
              >
                {NOTES.map((currNote) => (
                  <Option key={currNote.id} value={currNote.symbol}>
                    {currNote.sharpName}
                    {currNote.sharpName.includes(NoteNotationSymbol.Sharp)
                      ? ` / ${currNote.bmollName}`
                      : ""}
                  </Option>
                ))}
              </Select>
              <InputNumber
                min={MIN_OCTAVE}
                max={MAX_OCTAVE}
                value={note.octave}
                onChange={(octave) => handleOctaveChange(octave, note.id)}
              />
              <Button
                className={css.btn}
                type="primary"
                ghost
                disabled={values.notes.length === Guitar.MIN_STRINGS_COUNT}
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => handleNoteDelete(note.id)}
              />
            </div>
          </Form.Item>
        ))}
      </Form>
      <Button
        disabled={form.values.notes.length === Guitar.MAX_STRINGS_COUNT}
        type="primary"
        onClick={handleAddString}
      >
        {t("Add string")}
      </Button>
    </Modal>
  );
};

export { GuitarTuningPickerModal };
