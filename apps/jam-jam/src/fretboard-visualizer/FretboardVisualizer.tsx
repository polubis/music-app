import { Slider, Typography } from "antd";
import React, { useMemo } from "react";
import { useState } from "react";
import { createStrings } from "../fretboard/core";
import { Fretboard, FretboardProps } from "../fretboard/Fretboard";

import css from "./FretboardVisualizer.scss";

interface Filters {
  fretsRange: [number, number];
  fretsCount: number;
}

const { Title } = Typography;

const FRETS_COUNT = 24;
const MIN_FRET = 1;
const FILTERS: Filters = {
  fretsRange: [MIN_FRET, FRETS_COUNT],
  fretsCount: FRETS_COUNT,
};

const FretboardVisualizer = () => {
  const [filters, setFilters] = useState(FILTERS);

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

  const { fretsRange, fretsCount } = filters;

  const data = useMemo(
    (): FretboardProps => ({
      fretsCount,
      strings: createStrings(["E", "B", "G", "D", "A", "E"], fretsCount),
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
      </header>

      <Fretboard {...data} />
    </div>
  );
};

export { FretboardVisualizer };
