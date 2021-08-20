import {
  GuitarSound,
  GuitarString,
  GuitarTuning,
  NoteNotation,
  BMOLL_NOTES_NAMES,
  SHARP_NOTES_NAMES,
} from "./domain";

// GuitarStringCollection.create(['E,'A','B','C','E'], 24)
// GuitarStringCollection.retune('E', 'B', 'C', 'D', 'E');
// GuitarStringCollection.sliceFrets('E', 'B', 'C', 'D', 'E');
// GuitarStringCollection.filterSounds('E, 'B', 'C')
// GuitarStringCollection.filterStrings('E, 'B', 'C')
// GuitarStringCollection.reset();
// GuitarStringCollection.applyTuning(TUNINGS.DROP_C)
// GuitarStringCollection.valueOf()

export interface GuitarConfig {
  notation: NoteNotation;
  tuning: GuitarTuning;
  frets: number;
}

export class Guitar {
  strings: GuitarString[] = [];

  constructor(public config: GuitarConfig) {
    this._init();
  }

  private _init = (): void => {
    const { tuning, frets, notation } = this.config;
    const strings: GuitarString[] = [];

    for (let i = 0; i < tuning.length; i++) {
      const sound = tuning[i];
      let acc = (
        notation === "#" ? SHARP_NOTES_NAMES : BMOLL_NOTES_NAMES
      ).findIndex((currSound) => currSound === sound);
      const sounds: GuitarSound[] = [];

      for (let j = 0; j <= frets; j++) {
        sounds.push({
          fret: j,
          note: {
            bmollName: BMOLL_NOTES_NAMES[acc],
            sharpName: SHARP_NOTES_NAMES[acc],
            id: j,
          },
          label: j === 0 ? "OPEN" : "" + j,
        });
        const nextAcc = acc + 1;
        acc = nextAcc > SHARP_NOTES_NAMES.length - 1 ? 0 : nextAcc;
      }

      strings.push({ id: i + 1, sounds });
    }

    this.strings = strings;
  };
}
