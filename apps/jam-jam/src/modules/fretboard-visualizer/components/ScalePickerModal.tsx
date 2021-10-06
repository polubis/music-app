import { Modal, Select, Form, Typography } from "antd";
import { useMemo, useState } from "react";
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
  getOctavesFromPositions,
  KeyedNamedScale,
} from "../models";

import css from "./ScalePickerModal.module.less";
import { PlayManyButton } from "./PlayManyButton";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface ScalePickerModalProps {
  notation: NoteNotation;
  usedScale: KeyedNamedScale | undefined;
  hiddenPositions: NotePosition[];
  onOk: () => void;
  onChange: (positions: NotePosition[]) => void;
  onCancel: () => void;
  onPlay: (positions: NotePosition[]) => void;
}

const { Link } = Typography;
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
  usedScale,
  onOk,
  onChange,
  onPlay,
}: ScalePickerModalProps) => {
  const { t } = useTranslation();

  const memoizedHiddenPositions = useMemo(() => hiddenPositions, []);
  const [formData, setFormData] = useState<ScalePickerModalFormData>(
    usedScale
      ? {
          key: usedScale.key,
          type: usedScale.type,
          modeName: usedScale.modes[0].name
        }
      : {
          key: FIRST_NOTE_POSITION,
          type: ScaleType.Major,
          modeName: SCALES[0].modes[0].name,
        }
  );
  const [pickedScale, setPickedScale] = useState(pickScale(formData));

  const handleKeyChange = (key: NotePosition): void => {
    const newFormData: ScalePickerModalFormData = {
      ...formData,
      key,
    };
    const pickedScale = pickScale(newFormData);
    setFormData(newFormData);
    setPickedScale(pickedScale);
    onChange(pickedScale.positions);
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
    onChange(pickedScale.positions);
  };

  const handleModeChange = (modeName: string): void => {
    const newFormData: ScalePickerModalFormData = {
      ...formData,
      modeName,
    };
    const pickedScale = pickScale(newFormData);
    setFormData(newFormData);
    setPickedScale(pickedScale);
    onChange(pickedScale.positions);
  };

  const handleCancel = (): void => {
    onChange(
      NOTES_POSITIONS.filter(
        (position) => !memoizedHiddenPositions.includes(position)
      )
    );
    onCancel();
  };

  const handleOk = (): void => {
    onChange(pickedScale.positions);
    onOk();
  };

  const octaves = useMemo(
    () => getOctavesFromPositions(pickedScale.positions),
    [pickedScale]
  );

  useEffect(() => {
    onChange(pickedScale.positions);
  }, []);

  return (
    <Modal
      title={t("Scales")}
      visible
      okText={t("Apply")}
      cancelText={t("Cancel")}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Item label={t("ScaleKey")}>
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
        <Item label={t("ScaleType")}>
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
        <Item label={t("ScaleMode")}>
          <div style={{ display: "flex" }}>
            <Select
              value={formData.modeName}
              style={{ width: "100%", marginRight: "14px" }}
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
            <PlayManyButton onClick={() => onPlay(pickedScale.positions)} />
          </div>
        </Item>
        <Item label={t("Preview")}>
          <div className={css.preview}>
            {pickedScale.positions.map((position, idx) => (
              <NoteButton
                className={css.previewBtn}
                key={idx}
                position={position}
                notation={notation}
                octave={octaves[idx]}
                uncolored={idx === pickedScale.positions.length - 1}
              />
            ))}
          </div>
        </Item>

        <Item label={`${t("HowScalesWorks")}?`}>
          <Link
            rel="nofollow"
            href="https://www.youtube.com/watch?v=Vq2xt2D3e3E&t=881s"
            target="_blank"
          >
            {t("ScalesTutorialBy")} NewJazz
          </Link>
        </Item>
      </Form>
    </Modal>
  );
};

export { ScalePickerModal };
