import { NoteSymbol } from "./definitions";
import { GuitarNote } from "./guitarNote";

describe("GuitarNote", () => {
  const createGuitarNote = (symbol: NoteSymbol) => {
    return new GuitarNote(symbol, 0, 0);
  };

  it("assigns given properties", () => {
    const note = createGuitarNote(0);
    expect(note.position).toBe(0);
    expect(note.octave).toBe(0);
    expect(note.id).toBe(0);
  });

  describe("for position as symbol", () => {
    it("assigns position", () => {
      expect(createGuitarNote(0).position).toBe(0);
      expect(createGuitarNote(1).position).toBe(1);
      expect(createGuitarNote(3).position).toBe(3);
      expect(createGuitarNote(6).position).toBe(6);
      expect(createGuitarNote(8).position).toBe(8);
      expect(createGuitarNote(10).position).toBe(10);
      expect(createGuitarNote(11).position).toBe(11);
    });

    it("gives sharp name", () => {
      expect(createGuitarNote(0).sharpName).toBe("C");
      expect(createGuitarNote(1).sharpName).toBe("C#");
      expect(createGuitarNote(3).sharpName).toBe("D#");
      expect(createGuitarNote(6).sharpName).toBe("F#");
      expect(createGuitarNote(8).sharpName).toBe("G#");
      expect(createGuitarNote(10).sharpName).toBe("A#");
      expect(createGuitarNote(11).sharpName).toBe("B");
    });

    it("gives bmoll name", () => {
      expect(createGuitarNote(0).bmollName).toBe("C");
      expect(createGuitarNote(1).bmollName).toBe("Db");
      expect(createGuitarNote(3).bmollName).toBe("Eb");
      expect(createGuitarNote(6).bmollName).toBe("Gb");
      expect(createGuitarNote(8).bmollName).toBe("Ab");
      expect(createGuitarNote(10).bmollName).toBe("Bb");
      expect(createGuitarNote(11).bmollName).toBe("B");
    });
  });

  describe("for sharp name as symbol", () => {
    it("assigns position", () => {
      expect(createGuitarNote("C").position).toBe(0);
      expect(createGuitarNote("C#").position).toBe(1);
      expect(createGuitarNote("D#").position).toBe(3);
      expect(createGuitarNote("F#").position).toBe(6);
      expect(createGuitarNote("G#").position).toBe(8);
      expect(createGuitarNote("A#").position).toBe(10);
      expect(createGuitarNote("B").position).toBe(11);
    });

    it("gives sharp name", () => {
      expect(createGuitarNote("C").sharpName).toBe("C");
      expect(createGuitarNote("C#").sharpName).toBe("C#");
      expect(createGuitarNote("D#").sharpName).toBe("D#");
      expect(createGuitarNote("F#").sharpName).toBe("F#");
      expect(createGuitarNote("G#").sharpName).toBe("G#");
      expect(createGuitarNote("A#").sharpName).toBe("A#");
      expect(createGuitarNote("B").sharpName).toBe("B");
    });

    it("gives bmoll name", () => {
      expect(createGuitarNote("C").bmollName).toBe("C");
      expect(createGuitarNote("C#").bmollName).toBe("Db");
      expect(createGuitarNote("D#").bmollName).toBe("Eb");
      expect(createGuitarNote("F#").bmollName).toBe("Gb");
      expect(createGuitarNote("G#").bmollName).toBe("Ab");
      expect(createGuitarNote("A#").bmollName).toBe("Bb");
      expect(createGuitarNote("B").bmollName).toBe("B");
    });
  });

  describe("for bmoll name as symbol", () => {
    it("assigns position", () => {
      expect(createGuitarNote("C").position).toBe(0);
      expect(createGuitarNote("Db").position).toBe(1);
      expect(createGuitarNote("Eb").position).toBe(3);
      expect(createGuitarNote("Gb").position).toBe(6);
      expect(createGuitarNote("Ab").position).toBe(8);
      expect(createGuitarNote("Bb").position).toBe(10);
      expect(createGuitarNote("B").position).toBe(11);
    });

    it("gives sharp name", () => {
      expect(createGuitarNote("C").sharpName).toBe("C");
      expect(createGuitarNote("Db").sharpName).toBe("C#");
      expect(createGuitarNote("Eb").sharpName).toBe("D#");
      expect(createGuitarNote("Gb").sharpName).toBe("F#");
      expect(createGuitarNote("Ab").sharpName).toBe("G#");
      expect(createGuitarNote("Bb").sharpName).toBe("A#");
      expect(createGuitarNote("B").sharpName).toBe("B");
    });

    it("gives bmoll name", () => {
      expect(createGuitarNote("C").bmollName).toBe("C");
      expect(createGuitarNote("Db").bmollName).toBe("Db");
      expect(createGuitarNote("Eb").bmollName).toBe("Eb");
      expect(createGuitarNote("Gb").bmollName).toBe("Gb");
      expect(createGuitarNote("Ab").bmollName).toBe("Ab");
      expect(createGuitarNote("Bb").bmollName).toBe("Bb");
      expect(createGuitarNote("B").bmollName).toBe("B");
    });
  });
});
