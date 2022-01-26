import { error } from "dk";
import {
  Note,
  NotePosition,
  NoteOctave,
  NoteId,
  SHARP_NAMES,
  NoteSymbol,
  BMOLL_NAMES,
} from "./definitions";
import {
  getPosition,
  isBmollNoteNameSymbol,
  isNotePositionSymbol,
  isSharpNoteNameSymbol,
} from "./utils";

export class GuitarNote implements Note {
  sharpName!: string;
  bmollName!: string;
  position!: NotePosition;

  constructor(
    public symbol: NoteSymbol,
    public octave: NoteOctave,
    public id: NoteId,
    public hidden = false
  ) {
    this._initialize();
  }

  private _initialize = (): void => {
    const { symbol } = this;

    this.position = getPosition(symbol);

    if (isNotePositionSymbol(symbol)) {
      this.sharpName = SHARP_NAMES[symbol];
      this.bmollName = BMOLL_NAMES[symbol];
      return;
    }

    if (isSharpNoteNameSymbol(symbol)) {
      this.sharpName = symbol;
      this.bmollName = BMOLL_NAMES[this.position];
      return;
    }

    if (isBmollNoteNameSymbol(symbol)) {
      this.bmollName = symbol;
      this.sharpName = SHARP_NAMES[this.position];
      return;
    }

    throw error("LACK_OF_STRATEGY", "Given symbol needs dedicated strategy");
  };
}
