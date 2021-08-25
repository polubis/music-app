import { Slider, Typography, Select } from "antd";
import React, { useMemo } from "react";
import { useState } from "react";
import { createStrings } from "../fretboard/core";
import { Fretboard, FretboardProps } from "../fretboard/Fretboard";
import {
  NOTE_NAMES,
  GUITAR_SCALES,
  NoteName,
  Scale,
} from "../fretboard/models";

import css from "./FretboardVisualizer.scss";
interface Filters {
  fretsRange: [number, number];
  fretsCount: number;
  scale: Scale | null;
}

const { Title } = Typography;

const FRETS_COUNT = 24;
const MIN_FRET = 1;
const FILTERS: Filters = {
  fretsRange: [MIN_FRET, FRETS_COUNT],
  fretsCount: FRETS_COUNT,
  scale: null,
};

const FretboardVisualizer = () => {
  const [filters, setFilters] = useState(FILTERS);
  const [scaleHandle, setScaleHandle] = useState<Scale>({
    note: null,
    scale: null,
  });

  const handleFretsRangeChange = (fretsRange: [number, number]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      fretsRange,
    }));
  };

  const handleFretsCountChange = (fretsCount: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      fretsRange: [prevFilters.fretsRange[0], fretsCount],
      fretsCount,
    }));
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

  const { fretsRange, fretsCount, scale } = filters;
  const { Option } = Select;

  const data = useMemo(
    (): FretboardProps => ({
      fretsCount,
      strings: createStrings(["E", "B", "G", "D", "A", "E"], fretsCount, scale),
    }),
    [filters]
  );

  return (
    <div className={css.visualizer}>
      <header className={css.filters}>
        <div className={css.fretsRangeSlider}>
          <Title level={5}>Frets range</Title>
          <Slider
            range
            min={MIN_FRET}
            value={fretsRange}
            max={fretsCount}
            onChange={handleFretsRangeChange}
          />
        </div>

        <div className={css.fretsPicker}>
          <Title level={5}>Amount of frets</Title>
          <Slider
            min={MIN_FRET}
            value={fretsCount}
            max={FRETS_COUNT}
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
      </header>

      <Fretboard {...data} />
    </div>
  );
};

export { FretboardVisualizer };
