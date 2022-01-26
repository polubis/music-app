import {
  StringInstrument,
  StringInstrumentTuning,
  Note,
  StringInstrumentHand,
} from "./definitions";
import { GuitarNote } from "./guitarNote";

import { getNextOctave, getNextPosition, getPosition } from "./utils";

export class Guitar implements StringInstrument {
  static DEFAULT_NOTES_COUNT = 24;
  static MIN_NOTES_COUNT = 1;
  static MAX_NOTES_COUNT = 28;
  static MIN_STRINGS_COUNT = 1;
  static MAX_STRINGS_COUNT = 10;

  _allFrets: Note[][] = [];

  frets: Note[][] = [];

  constructor(
    public tuning: StringInstrumentTuning,
    public notesCount = Guitar.DEFAULT_NOTES_COUNT,
    public hand: StringInstrumentHand = "right"
  ) {
    this._initialize();
  }

  private _sliceAllFrets = (start: number, stop: number): Note[][] => {
    return this._allFrets.slice(start, stop);
  };

  private _assignFrets = (start: number, stop: number): void => {
    const frets = this._sliceAllFrets(start, stop);

    if (this.hand === "right") {
      this.frets = frets;
      return;
    }

    this.frets = frets.map((notes) => [...notes].reverse());
  };

  private _initialize = (): void => {
    const { notesCount, tuning } = this;
    const frets: Note[][] = Array.from(
      { length: Guitar.MAX_NOTES_COUNT },
      () => []
    );
    const stringsCount = this.tuning.notes.length;

    for (let i = 0; i < stringsCount; i++) {
      const tuningNote = tuning.notes[i];
      let notePositionAcc = getPosition(tuningNote.symbol);
      let noteOctaveAcc = tuningNote.octave;

      for (let j = 0; j < Guitar.MAX_NOTES_COUNT; j++) {
        const note = new GuitarNote(
          notePositionAcc,
          noteOctaveAcc,
          `${i}:${j}`
        );
        frets[j].push(note);
        notePositionAcc = getNextPosition(notePositionAcc);
        noteOctaveAcc =
          notePositionAcc === 0 ? getNextOctave(noteOctaveAcc) : noteOctaveAcc;
      }
    }

    this._allFrets = frets;
    this._assignFrets(0, notesCount);
  };

  changeNotesCount = (notesCount: number): this => {
    this.notesCount = notesCount;
    this._assignFrets(0, this.notesCount);
    return this.clone();
  };

  changeHand = (hand: StringInstrumentHand): this => {
    this.hand = hand;
    this._assignFrets(0, this.notesCount);
    return this.clone();
  };

  changeTuning = (tuning: StringInstrumentTuning): this => {
    this.tuning = tuning;
    this._initialize();
    return this.clone();
  };

  clone = (): this => ({ ...this });
}
