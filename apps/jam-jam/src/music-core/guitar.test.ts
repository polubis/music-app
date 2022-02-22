import {
  NoteSymbol,
  StringInstrumentHand,
  StringInstrumentTuningType,
  Note,
} from "./definitions";
import { Guitar } from "./guitar";

describe("Guitar", () => {
  const TUNING: Partial<Note>[] = [
    {
      symbol: "E",
      octave: 4,
    },
    {
      symbol: "B",
      octave: 3,
    },
    {
      symbol: "G",
      octave: 3,
    },
    {
      symbol: "D",
      octave: 3,
    },
    {
      symbol: "A",
      octave: 2,
    },
    {
      symbol: "E",
      octave: 2,
    },
  ];

  it("assigns tuning and notes count", () => {
    const { tuning, notesCount } = new Guitar(
      {
        name: "E standard",
        type: StringInstrumentTuningType.Alternate,
        notes: TUNING,
      },
      24
    );
    expect(notesCount).toBe(24);
    expect(tuning).toBeTruthy();
  });

  it("updates notes count and recreates frets", () => {
    const guitar = new Guitar(
      {
        name: "E standard",
        type: StringInstrumentTuningType.Alternate,
        notes: TUNING,
      },
      24
    );

    expect(guitar.notesCount).toBe(24);
    expect(guitar.frets.length).toBe(24);

    guitar.changeNotesCount(20);

    expect(guitar.notesCount).toBe(20);
    expect(guitar.frets.length).toBe(20);
  });

  it("changes hand and sorts frets", () => {
    const guitar = new Guitar(
      {
        name: "E standard",
        type: StringInstrumentTuningType.Alternate,
        notes: TUNING,
      },
      2
    );

    expect(guitar.hand).toBe("right" as StringInstrumentHand);
    expect(guitar.frets[1][1].sharpName).toBe("C" as NoteSymbol);

    guitar.changeHand("left");

    expect(guitar.hand).toBe("left" as StringInstrumentHand);
    expect(guitar.frets[1][1].sharpName).toBe("A#" as NoteSymbol);
  });

  it("creates 2 string guitar with 1 fret and open string notes", () => {
    const { frets } = new Guitar(
      {
        name: "E standard",
        type: StringInstrumentTuningType.Alternate,
        notes: [TUNING[0], TUNING[1]],
      },
      2
    );

    const [openFret, firstFret] = frets;

    expect(openFret[0].sharpName).toBe("E" as NoteSymbol);
    expect(openFret[1].sharpName).toBe("B" as NoteSymbol);
    expect(firstFret[0].sharpName).toBe("F" as NoteSymbol);
    expect(firstFret[1].sharpName).toBe("C" as NoteSymbol);
  });
});
