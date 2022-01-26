import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import loadable from "@loadable/component";
import { Button, Divider, Select, message, Popconfirm } from "antd";
import { useToggle } from "dk";
import {
  useGuitarProvider,
  useGuitarTuningsProvider,
  useNotesPlayProvider,
} from "modules/fretboard-visualization/providers";
import { StringInstrumentTuning, StringInstrumentTuningType } from "music-core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import css from "./GuitarTuningPickerComponent.module.less";

const GuitarTuningPickerModal = loadable(
  () => import("./GuitarTuningPickerModal"),
  {
    resolveComponent: (imported) => imported.GuitarTuningPickerModal,
  }
);

const { OptGroup, Option } = Select;

const GuitarTuningPickerComponent = () => {
  const { t } = useTranslation();

  const {
    E_STANDARD,
    tunings,
    tuningsGroups,
    addTuning,
    editTuning,
    removeTuning,
  } = useGuitarTuningsProvider();
  const { playSequence } = useNotesPlayProvider();
  const { guitar, changeTuning } = useGuitarProvider();

  const { isOpen, toggle } = useToggle();

  const [currentlyEditedTuning, setCurrentlyEditedTuning] = useState<
    StringInstrumentTuning | undefined
  >();

  const handleTuningSelect = (name: string): void => {
    changeTuning(tunings.find((tuning) => tuning.name === name)!);
  };

  const handleEditClick = (): void => {
    setCurrentlyEditedTuning(guitar.tuning);
    toggle();
  };

  const handleDeleteClick = (): void => {
    changeTuning(E_STANDARD);
    removeTuning(guitar.tuning.id);
    message.success(t("Tuning successfully deleted"));
  };

  const handleTuningSubmit = (tuning: StringInstrumentTuning): void => {
    const isEditing = !!currentlyEditedTuning;

    toggle();

    if (isEditing) {
      editTuning(tuning);
      changeTuning(tuning);
      message.success(t("Tuning successfully edited"));
      setCurrentlyEditedTuning(undefined);
      return;
    }

    addTuning(tuning);
    changeTuning(tuning);
    message.success(t("New tuning created"));
  };

  return (
    <>
      <Select
        className={css.select}
        value={guitar.tuning.name}
        showArrow
        onChange={handleTuningSelect}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider className={css.divider} />
            <div className={css.footer}>
              <Button
                className={css.btn}
                shape="circle"
                type="primary"
                onClick={toggle}
              >
                <PlusOutlined />
              </Button>
              <Button
                className={css.btn}
                shape="circle"
                type="primary"
                onClick={() => playSequence(guitar.tuning.notes)}
              >
                <SoundOutlined />
              </Button>
              {guitar.tuning.type === StringInstrumentTuningType.Custom && (
                <>
                  <Button
                    className={css.btn}
                    shape="circle"
                    type="primary"
                    onClick={handleEditClick}
                  >
                    <EditOutlined />
                  </Button>

                  <Popconfirm
                    placement="topLeft"
                    title={t("Are you sure you want to remove this setting?")}
                    onConfirm={handleDeleteClick}
                    okText={t("Yes")}
                    cancelText={t("No")}
                  >
                    <Button
                      className={css.btn}
                      shape="circle"
                      type="primary"
                      danger
                    >
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                </>
              )}
            </div>
          </>
        )}
      >
        {tuningsGroups
          .filter((group) => group.tunings.length > 0)
          .map((group) => (
            <OptGroup key={group.type} label={group.type}>
              {group.tunings.map((tuning) => (
                <Option key={tuning.name} value={tuning.name}>
                  {tuning.name} (
                  {tuning.notes
                    .map((note) => `${note.symbol}${note.octave}`)
                    .reverse()
                    .join(",")}
                  )
                </Option>
              ))}
            </OptGroup>
          ))}
      </Select>
      {isOpen && (
        <GuitarTuningPickerModal
          initData={currentlyEditedTuning}
          onCancel={toggle}
          onSubmit={handleTuningSubmit}
        />
      )}
    </>
  );
};

export { GuitarTuningPickerComponent };
