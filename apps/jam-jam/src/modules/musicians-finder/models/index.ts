import { InstrumentsType, MusicGenresType } from "../utils";

export type UserData = {
  nick: string;
  instrument: InstrumentsType | null;
  exp: number | null;
  genre: MusicGenresType | null;
  lat: string | null;
  lng: string | null;
};
