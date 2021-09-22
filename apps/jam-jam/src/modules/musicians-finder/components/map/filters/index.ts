import {
  InstrumentsType,
  MusicGenresType,
} from "src/modules/musicians-finder/utils";
import { UserData } from "src/modules/musicians-finder/models/index";

export const filterByInstruments = (
  users: UserData[],
  instruments: InstrumentsType[]
) => {
  return users.filter(
    (u) => u.instrument && instruments.includes(u.instrument)
  );
};

export const filterByGenres = (
  users: UserData[],
  genres: MusicGenresType[]
) => {
  return users.filter((u) => u.genre && genres.includes(u.genre));
};

export const filterByExp = (users: UserData[], exp: number) => {
  return users.filter((u) => u.exp && u.exp <= exp);
};
