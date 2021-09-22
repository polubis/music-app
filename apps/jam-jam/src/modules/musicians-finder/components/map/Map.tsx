import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Select, Slider } from "antd";
import { temporaryUsers } from "../../utils/index";
import { useUserForm } from "../../../../providers/user-form-provider";
import { UserData } from "../../../../modules/musicians-finder/models/index";
import { Marker } from "./marker/Marker";
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
import css from "./Map.scss";

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

const { Option } = Select;

export const Map = () => {
  const [filters, setFilters] = useState(FILTERS);
  const { data } = useUserForm();
  const defaultProps = {
    center: {
      lat: Number(data.lat ?? 53.77781794425216), //fallback for test
      lng: Number(data.lng ?? 20.474514148698375), //fallback for test
    },
    zoom: 11,
  };

  const onInstrumentsChange = (arr: InstrumentsType[]) =>
    setFilters({ ...filters, instruments: arr.length ? arr : Instruments });

  const onGenresChange = (arr: MusicGenresType[]) =>
    setFilters({ ...filters, genres: arr.length ? arr : MusicGenres });

  const onExpChange = (exp: number) => setFilters({ ...filters, exp: exp });

  const users: UserData[] = useMemo(() => {
    const filteredByInstruments = filterByInstruments(
      temporaryUsers,
      filters.instruments
    );
    const filteredByExp = filterByExp(filteredByInstruments, filters.exp);
    const filteredByGenres = filterByGenres(filteredByExp, filters.genres);

    return filteredByGenres;
  }, [filters]);

  return (
    <div>
      <Select
        mode="multiple"
        allowClear
        placeholder="Instruments"
        style={{ width: "200px" }}
        onChange={onInstrumentsChange}
      >
        {Instruments.map((el) => (
          <Option key={el} value={el}>
            {el}
          </Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        allowClear
        placeholder="Genres"
        style={{ width: "200px" }}
        onChange={onGenresChange}
      >
        {MusicGenres.map((el) => (
          <Option key={el} value={el}>
            {el}
          </Option>
        ))}
      </Select>
      <p>Experience</p>
      <Slider
        min={0}
        max={5}
        defaultValue={5}
        style={{ width: "200px" }}
        onChange={onExpChange}
      />
      <MapContainer
        className={css["leaflet-container"]}
        center={defaultProps.center}
        zoom={12}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={defaultProps.center} type="secondary" user={data} />
        {users.map((u, i) => {
          return (
            <Marker
              key={i}
              position={{ lat: Number(u.lat), lng: Number(u.lng) }}
              type="primary"
              user={u}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};
