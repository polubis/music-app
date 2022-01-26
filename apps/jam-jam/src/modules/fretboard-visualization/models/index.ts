import { NoteNotationSymbol, NotePosition } from "music-core";

export type HiddenNotes = Partial<Record<NotePosition, boolean>>;

export type AvailableFrets = [number, number];

export interface GuitarSettings {
  octavesDisplayed: boolean;
  notation: NoteNotationSymbol;
  singleColor: boolean;
  soundEnabled: boolean;
  hiddenNotes: HiddenNotes;
  availableFrets: AvailableFrets;
}
