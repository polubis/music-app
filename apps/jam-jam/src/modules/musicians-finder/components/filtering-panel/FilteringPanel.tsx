import React, { useState, useMemo } from "react";
import {
  MusicGenresType,
  InstrumentsType,
  MusicGenres,
  Instruments,
} from "../../utils/index";
import {
  filterByExp,
  filterByGenres,
  filterByInstruments,
} from "./filters/index";
import { Row, Col } from "antd";
import { temporaryUsers } from "../../utils/index";
import { Select, Slider } from "antd";
import { useUsersFiltering } from "providers";
import css from "./FilteringPanel.module.less";
const { Option } = Select;

interface Filters {
  instruments: InstrumentsType[];
  exp: number;
  genres: MusicGenresType[];
}

const FILTERS: Filters = {
  instruments: Instruments,
  exp: 5,
  genres: MusicGenres,
};

export const FilteringPanel = () => {
  const [filters, setFilters] = useState(FILTERS);
  const { setUsers } = useUsersFiltering();

  const onInstrumentsChange = (arr: InstrumentsType[]) =>
    setFilters({ ...filters, instruments: arr.length ? arr : Instruments });

  const onGenresChange = (arr: MusicGenresType[]) =>
    setFilters({ ...filters, genres: arr.length ? arr : MusicGenres });

  const onExpChange = (exp: number) => setFilters({ ...filters, exp: exp });

  useMemo(() => {
    const filteredByInstruments = filterByInstruments(
      temporaryUsers,
      filters.instruments
    );
    const filteredByExp = filterByExp(filteredByInstruments, filters.exp);
    const filteredByGenres = filterByGenres(filteredByExp, filters.genres);

    setUsers(filteredByGenres);
  }, [filters]);

  return (
    <div className={css['filtering-panel-container']}>
      <Row gutter={[8, 8]}>
        <Col span={12} className={css.column}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Instruments"
            className={css.control}
            onChange={onInstrumentsChange}
          >
            {Instruments.map((el) => (
              <Option key={el} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={12} className={css.column}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Genres"
            className={css.control}
            onChange={onGenresChange}
          >
            {MusicGenres.map((el) => (
              <Option key={el} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={24}>
          <p>Experience</p>
          <Slider
            min={0}
            max={5}
            defaultValue={5}
            onChange={onExpChange}
          />
        </Col>
      </Row >
    </div>
  )
}