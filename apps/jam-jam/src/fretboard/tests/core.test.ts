import { Guitar, GuitarConfig } from "../core";
import { SharpNoteName } from "../domain";

const mockGuitar = (config: Partial<GuitarConfig> = {}) =>
  new Guitar({
    frets: 24,
    notation: "#",
    tuning: ["E", "B", "G", "D", "A", "E"],
    ...config,
  });

describe("Guitar", () => {
  describe("inits", () => {
    it("sets correct ids for strings", () => {
      const guitar = mockGuitar();

      expect(guitar.strings.map((string) => string.id)).toEqual([
        1, 2, 3, 4, 5, 6,
      ]);
    });

    it("sets correct ids for notes", () => {
      const guitar = mockGuitar();

      expect(guitar.strings[0].sounds.map((sound) => sound.note.id)).toEqual(
        Array.from({ length: guitar.config.frets + 1 }, (_, idx) => idx)
      );
    });

    it("adds open string sound", () => {
      const guitar = mockGuitar({ frets: 12 });

      expect(guitar.strings[0].sounds.length).toEqual(guitar.config.frets + 1);
    });

    it("sets hidden property undefined as default for strings and sounds", () => {
      const guitar = mockGuitar({ frets: 2 });

      expect(guitar.strings[0].hidden).toBeFalsy();
      expect(guitar.strings[0].sounds.map((sound) => sound.hidden)).toEqual(
        Array.from({ length: guitar.config.frets + 1 })
      );
    });

    it("sets correct fret", () => {
      const guitar = mockGuitar();

      expect(guitar.strings[0].sounds.map((sound) => sound.fret)).toEqual(
        Array.from({ length: guitar.config.frets + 1 }, (_, idx) => idx)
      );
    });

    it("sets correct sound labels", () => {
      const guitar = mockGuitar({ frets: 2 });
      const [firstString] = guitar.strings;

      expect(firstString.sounds.map((sound) => sound.label)).toEqual([
        "OPEN",
        "1",
        "2",
      ]);
    });

    describe("sets correct note names for", () => {
      it("# notation", () => {
        const guitar = mockGuitar({ frets: 10, tuning: ["E"] });

        expect(
          guitar.strings[0].sounds.map((sound) => sound.note.sharpName)
        ).toEqual([
          "E",
          "F",
          "F#",
          "G",
          "G#",
          "A",
          "A#",
          "B",
          "C",
          "C#",
          "D",
        ] as SharpNoteName[]);
      });

      it("b notation", () => {
        const guitar = mockGuitar({
          frets: 10,
          tuning: ["E", "Db"],
          notation: "b",
        });

        expect(
          guitar.strings[0].sounds.map((sound) => sound.note.bmollName)
        ).toEqual([
          "E",
          "F",
          "Gb",
          "G",
          "Ab",
          "A",
          "Bb",
          "B",
          "C",
          "Db",
          "D",
        ] as SharpNoteName[]);
        expect(
          guitar.strings[1].sounds.map((sound) => sound.note.bmollName)
        ).toEqual([
          "Db",
          "D",
          "Eb",
          "E",
          "F",
          "Gb",
          "G",
          "Ab",
          "A",
          "Bb",
          "B",
        ] as SharpNoteName[]);
      });
    });
  });
});
