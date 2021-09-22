import { UserData } from "../../../modules/musicians-finder/models/index";

export type MusicGenresType =
  | "Blues"
  | "Classic"
  | "Country"
  | "Indie"
  | "Latin"
  | "Metal"
  | "Pop"
  | "Rock";

export const MusicGenres: MusicGenresType[] = [
  "Blues",
  "Classic",
  "Country",
  "Indie",
  "Latin",
  "Metal",
  "Pop",
  "Rock",
];

export type InstrumentsType = "Guitar";

export const Instruments: InstrumentsType[] = ["Guitar"];

export const temporaryUsers: UserData[] = [
  {
    nick: "Kenny",
    instrument: "Guitar",
    exp: 4,
    genre: "Rock",
    lat: "53.7780434913293",
    lng: "20.48626974960233",
  },
  {
    nick: "John",
    instrument: "Guitar",
    exp: 3,
    genre: "Blues",
    lat: "53.7754520946399",
    lng: "20.474136940980816",
  },
  {
    nick: "Peter",
    instrument: "Guitar",
    exp: 1,
    genre: "Metal",
    lat: "53.76547904731127",
    lng: "20.43390674502701",
  },
];
