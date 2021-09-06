import {
  Button,
  Dropdown,
  Menu,
  Radio,
  Slider,
  Space,
  Switch,
  Typography,
} from "antd";
import React, { useMemo, useState } from "react";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  createStrings,
  pickSoundsInStrings,
  setStringsVisibilityByRange,
  sliceSoundsInStrings,
  TUNINGS,
} from "../fretboard/core";
import { Fretboard } from "../fretboard/Fretboard";

import css from "./FretboardVisualizer.scss";
import { GuitarTuning, NoteName, NOTE_NAMES } from "../fretboard/models";
import { Checkbox } from "antd";

type RadioSelectValue = NoteName | "all" | "none" | "";

interface Filters {
  tuning: GuitarTuning;
  range: [number, number];
  fretsCount: number;
  markersDisabled: boolean;
  pickedNoteNames: NoteName[];
  stringsCount: number;
  stringsRange: [number, number];
}

const { Title } = Typography;

const MAX_STRINGS_COUNT = 10;
const MIN_STRINGS_COUNT = 1;
const MIN_FRETS_COUNt = 0;
const MAX_FRETS_COUNT = 30;
const FILTERS: Filters = {
  tuning: TUNINGS[0],
  range: [MIN_FRETS_COUNt, MAX_FRETS_COUNT],
  stringsRange: [MIN_STRINGS_COUNT, MAX_STRINGS_COUNT],
  fretsCount: 24,
  markersDisabled: false,
  pickedNoteNames: [...NOTE_NAMES],
  stringsCount: TUNINGS[0].notes.length,
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

  const handleRangeChange = (range: [number, number]) => {
    setFilters({ ...filters, range });
  };

  const handleFretsCountChange = (fretsCount: number) => {
    setFilters({
      ...filters,
      fretsCount,
    });
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
    setFilters({
      ...filters,
      pickedNoteNames: checked
        ? [...filters.pickedNoteNames, noteName]
        : filters.pickedNoteNames.filter(
            (currNoteName) => currNoteName !== noteName
          ),
    });
  };

  const handleTuningPick = (tuning: GuitarTuning) => {
    setFilters({
      ...filters,
      tuning,
      stringsCount: tuning.notes.length,
    });
  };

  const handleStringsRangeChange = (stringsRange: [number, number]): void => {
    setFilters({
      ...filters,
      stringsRange,
    });
  };

  const handleStringsCountChange = (stringsCount: number) => {
    if (stringsCount < filters.tuning.notes.length) {
      setFilters({
        ...filters,
        stringsCount,
        tuning: {
          name: "Custom",
          notes: filters.tuning.notes.filter(
            (_, idx) => idx <= stringsCount - 1
          ),
        },
      });
      return;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      stringsCount,
      tuning: {
        name: "Custom",
        notes: [
          ...filters.tuning.notes,
          ...Array.from({
            length: stringsCount - prevFilters.stringsCount,
          }).map(() => filters.tuning.notes[0]),
        ],
      },
    }));
  };

  const {
    range,
    fretsCount,
    markersDisabled,
    pickedNoteNames,
    tuning,
    stringsCount,
    stringsRange,
  } = filters;

  const strings = useMemo(() => {
    const result = setStringsVisibilityByRange(
      pickSoundsInStrings(
        pickedNoteNames,
        sliceSoundsInStrings(range, createStrings(tuning.notes, fretsCount))
      ),
      stringsRange
    );

    return result;
  }, [filters]);

  return (
    <div className={css.visualizer}>
      <header className={css.filters}>
        <div className={css.stringsManager}>
          <Title level={5}>Manage strings</Title>
          <Slider
            min={1}
            value={stringsCount}
            max={MAX_STRINGS_COUNT}
            onChange={handleStringsCountChange}
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

        <div className={css.rangeSlider}>
          <Title level={5}>Strings range</Title>
          <Slider
            range
            min={MIN_STRINGS_COUNT}
            value={stringsRange}
            max={stringsCount}
            onChange={handleStringsRangeChange}
          />
        </div>

        <div className={css.markersSwitch}>
          <Title level={5}>Disable markers</Title>

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
            {pickedNoteNames.length === 1 ? "note" : "notes"} selected
            <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown
          overlay={
            <Menu>
              <Menu.ItemGroup key="custom" title="Custom tunings">
                <Radio.Group
                  style={{ padding: "10px" }}
                  value={
                    TUNINGS.some((tun) => tun.name === tuning.name)
                      ? ""
                      : "custom"
                  }
                  onChange={(e) => handleTuningPick(e.target.value)}
                >
                  <Radio value="custom">
                    Custom [{tuning.notes.join(",")}]
                  </Radio>
                </Radio.Group>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="standard" title="Standard tunings">
                <Radio.Group
                  style={{ padding: "10px" }}
                  value={tuning}
                  onChange={(e) => handleTuningPick(e.target.value)}
                >
                  {TUNINGS.filter((tuning) =>
                    tuning.name.toLowerCase().includes("standard")
                  ).map((tuning) => (
                    <Radio key={tuning.name} value={tuning}>
                      {tuning.name} [{tuning.notes.join(",")}]
                    </Radio>
                  ))}
                </Radio.Group>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="drop" title="Drop tunings">
                <Radio.Group
                  style={{ padding: "10px" }}
                  value={tuning}
                  onChange={(e) => handleTuningPick(e.target.value)}
                >
                  {TUNINGS.filter((tuning) =>
                    tuning.name.toLowerCase().includes("drop")
                  ).map((tuning) => (
                    <Radio key={tuning.name} value={tuning}>
                      {tuning.name} [{tuning.notes.join(",")}]
                    </Radio>
                  ))}
                </Radio.Group>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="open" title="Open tunings">
                <Radio.Group
                  style={{ padding: "10px" }}
                  value={tuning}
                  onChange={(e) => handleTuningPick(e.target.value)}
                >
                  {TUNINGS.filter((tuning) =>
                    tuning.name.toLowerCase().includes("open")
                  ).map((tuning) => (
                    <Radio key={tuning.name} value={tuning}>
                      {tuning.name} [{tuning.notes.join(",")}]
                    </Radio>
                  ))}
                </Radio.Group>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="other" title="Other">
                <Radio.Group
                  style={{ padding: "10px" }}
                  value={tuning}
                  onChange={(e) => handleTuningPick(e.target.value)}
                >
                  {TUNINGS.filter(
                    (tuning) =>
                      !tuning.name.toLowerCase().includes("drop") &&
                      !tuning.name.toLowerCase().includes("standard") &&
                      !tuning.name.toLowerCase().includes("open")
                  ).map((tuning) => (
                    <Radio key={tuning.name} value={tuning}>
                      {tuning.name} [{tuning.notes.join(",")}]
                    </Radio>
                  ))}
                </Radio.Group>
              </Menu.ItemGroup>
            </Menu>
          }
        >
          <Button className={css.tuningPicker} type="primary">
            Tuning: {tuning.name} [{tuning.notes.join(",")}]
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button type="primary" size="middle" icon={<PlusOutlined />} />
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
