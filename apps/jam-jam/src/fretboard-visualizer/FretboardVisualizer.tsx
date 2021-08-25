import {
  Button,
  Dropdown,
  Menu,
  Radio,
  Slider,
  Space,
  Switch,
  Select,
  Typography,
} from "antd";
import React, { useMemo, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  createStrings,
  pickSoundsInStrings,
  sliceSoundsInStrings,
} from "../fretboard/core";
import { Fretboard } from "../fretboard/Fretboard";

import css from "./FretboardVisualizer.scss";
import {
  GUITAR_SCALES,
  NoteName,
  NOTE_NAMES,
  Scale,
} from "../fretboard/models";
import Checkbox from "antd/lib/checkbox/Checkbox";

type RadioSelectValue = NoteName | "all" | "none" | "";

interface Filters {
  range: [number, number];
  fretsCount: number;
  scale: Scale | null;
  markersDisabled: boolean;
  pickedNoteNames: NoteName[];
}

const { Title } = Typography;

const MAX_FRETS_COUNT = 30;
const FILTERS: Filters = {
  range: [0, MAX_FRETS_COUNT],
  fretsCount: 24,
  markersDisabled: false,
  pickedNoteNames: [...NOTE_NAMES],
  scale: null,
};

const getRadioGroupValue = (pickedNoteNames: NoteName[]): RadioSelectValue => {
  if (pickedNoteNames.length === NOTE_NAMES.length) {
    return "all";
  }

  if (pickedNoteNames.length === 0) {
    return "none";
  }

  if (pickedNoteNames.length === 1) {
    return pickedNoteNames[0];
  }

  return "";
};

const FretboardVisualizer = () => {
  const [filters, setFilters] = useState(FILTERS);
  const [scaleHandle, setScaleHandle] = useState<Scale>({
    note: null,
    scale: null,
  });

  const handleRangeChange = (range: [number, number]) => {
    setFilters({ ...filters, range });
  };

  const handleFretsCountChange = (fretsCount: number) => {
    setFilters({
      ...filters,
      fretsCount,
    });
  };

  const handleGuitarScaleChange = (scale: typeof GUITAR_SCALES[number]) => {
    setScaleHandle({
      ...scaleHandle,
      scale: scale,
    });
    if (scaleHandle.note) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        scale: { note: scaleHandle.note, scale: scale },
      }));
    }
  };

  const handleGuitarScaleNoteChange = (note: NoteName) => {
    setScaleHandle({
      ...scaleHandle,
      note: note,
    });
    if (scaleHandle.scale) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        scale: { note: note, scale: scaleHandle.scale },
      }));
    }
  };

  const handleMarkersDisabledChange = (checked: boolean) => {
    setFilters({
      ...filters,
      markersDisabled: checked,
    });
  };

  const handleSingleNotePick = (value: RadioSelectValue): void => {
    if (value === "all") {
      setFilters({
        ...filters,
        pickedNoteNames: [...NOTE_NAMES],
      });
      return;
    }

    if (value === "none") {
      setFilters({
        ...filters,
        pickedNoteNames: [],
      });
      return;
    }

    setFilters({
      ...filters,
      pickedNoteNames: [value as NoteName],
    });
  };

  const handleManyNotePick = (noteName: NoteName, checked: boolean): void => {
    console.log(noteName, checked);
    setFilters({
      ...filters,
      pickedNoteNames: checked
        ? [...filters.pickedNoteNames, noteName]
        : filters.pickedNoteNames.filter(
            (currNoteName) => currNoteName !== noteName
          ),
    });
  };

  const { range, fretsCount, markersDisabled, pickedNoteNames, scale } =
    filters;
  const { Option } = Select;

  const strings = useMemo(() => {
    const result = sliceSoundsInStrings(
      range,
      createStrings(["E", "B", "G", "D", "A", "E"], fretsCount, scale)
    );

    return pickSoundsInStrings(pickedNoteNames, result);
  }, [filters]);

  return (
    <div className={css.visualizer}>
      <header className={css.filters}>
        <div className={css.rangeSlider}>
          <Title level={5}>Range</Title>
          <Slider
            range
            min={0}
            value={range}
            max={fretsCount}
            onChange={handleRangeChange}
          />
        </div>

        <div className={css.fretsPicker}>
          <Title level={5}>Amount of frets</Title>
          <Slider
            min={1}
            value={fretsCount}
            max={MAX_FRETS_COUNT}
            onChange={handleFretsCountChange}
          />
        </div>

        <div className={css.scalePickerContainer}>
          <Title level={5}>Scale</Title>
          <div className={css.scalePicker}>
            <Select style={{ width: 120 }} onChange={handleGuitarScaleChange}>
              {GUITAR_SCALES.map((scale: string) => {
                return (
                  <Option key={scale} value={scale}>
                    {scale}
                  </Option>
                );
              })}
            </Select>
            <Select
              style={{ width: 120 }}
              onChange={handleGuitarScaleNoteChange}
            >
              {NOTE_NAMES.map((note: string) => {
                return (
                  <Option key={note} value={note}>
                    {note}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className={css.markersSwitch}>
          <Title level={5}>Markers</Title>

          <Switch
            checked={markersDisabled}
            onChange={handleMarkersDisabledChange}
          />
        </div>

        <Dropdown
          overlay={
            <Menu>
              <Menu.ItemGroup key="pick-one" title="Pick one">
                <Radio.Group
                  style={{ padding: "10px" }}
                  value={getRadioGroupValue(pickedNoteNames)}
                  onChange={(e) => handleSingleNotePick(e.target.value)}
                >
                  {NOTE_NAMES.map((noteName) => (
                    <Radio key={noteName} value={noteName}>
                      {noteName}
                    </Radio>
                  ))}
                  <Radio key="all" value="all">
                    All
                  </Radio>
                  <Radio key="none" value="none">
                    None
                  </Radio>
                </Radio.Group>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="pick-two" title="Pick many">
                <Space style={{ padding: "10px" }}>
                  {NOTE_NAMES.map((noteName, idx) => (
                    <Checkbox
                      key={idx}
                      checked={pickedNoteNames.includes(noteName)}
                      onChange={(e) =>
                        handleManyNotePick(noteName, e.target.checked)
                      }
                    >
                      {noteName}
                    </Checkbox>
                  ))}
                </Space>
              </Menu.ItemGroup>
            </Menu>
          }
        >
          <Button className={css.notePicker} type="primary">
            {pickedNoteNames.length}{" "}
            {pickedNoteNames.length <= 1 ? "note" : "notes"} selected
            <DownOutlined />
          </Button>
        </Dropdown>
      </header>

      <Fretboard
        strings={strings}
        fretsCount={fretsCount}
        markersDisabled={markersDisabled}
      />
    </div>
  );
};

export { FretboardVisualizer };
