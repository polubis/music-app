import {
  createFretsMarkers,
  pickSounds,
  pickSoundsInStrings,
  sliceSoundsInStrings,
  sliceStringSounds,
} from "../core";
import { GuitarSound } from "../models";
import { GuitarStringMock, GuitarStringsMock } from "./mocks";

describe("createFretsMarkers()", () => {
  it("creates frets markers", () => {
    expect(createFretsMarkers(24, [3, 2, 2, 2, 3])).toEqual([
      3, 5, 7, 9, 12, 15, 17, 19, 21, 24,
    ]);
    expect(createFretsMarkers(25, [3, 2, 2, 2, 3])).toEqual([
      3, 5, 7, 9, 12, 15, 17, 19, 21, 24,
    ]);
    expect(createFretsMarkers(3, [1, 1, 1])).toEqual([1, 2, 3]);
  });
});

describe("sliceStringSounds()", () => {
  it("slices string sounds", () => {
    const { sounds } = GuitarStringMock().fillSounds("C", 20).valueOf();
    expect(sliceStringSounds([0, 2], sounds)).toEqual([
      sounds[0],
      sounds[1],
      sounds[2],
    ] as GuitarSound[]);
    expect(sliceStringSounds([3, 5], sounds)).toEqual([
      sounds[3],
      sounds[4],
      sounds[5],
    ] as GuitarSound[]);
  });

  describe("sliceSoundsInStrings()", () => {
    it("slices sounds in every string", () => {
      const strings = GuitarStringsMock().fromNames(["E", "B"], 20).valueOf();
      const slicedStrings = sliceSoundsInStrings([3, 5], strings);

      expect(slicedStrings[0].sounds).toEqual([
        strings[0].sounds[3],
        strings[0].sounds[4],
        strings[0].sounds[5],
      ]);
      expect(slicedStrings[1].sounds).toEqual([
        strings[1].sounds[3],
        strings[1].sounds[4],
        strings[1].sounds[5],
      ]);
    });
  });

  describe("pickSounds()", () => {
    it("picks sounds by names", () => {
      const { sounds } = GuitarStringMock().fillSounds("C", 4).valueOf();

      expect(
        pickSounds(["C", "D"], sounds).map((sound) => sound.hidden)
      ).toEqual([false, true, false, true]);
    });
  });

  describe("pickSoundsInStrings()", () => {
    it("picks sounds in every string by names", () => {
      const strings = GuitarStringsMock().fromNames(["C", "D"], 4).valueOf();
      const stringsResult = pickSoundsInStrings(["C", "D"], strings);

      expect(stringsResult[0].sounds.map((sound) => sound.hidden)).toEqual([
        false,
        true,
        false,
        true,
      ]);
      expect(stringsResult[1].sounds.map((sound) => sound.hidden)).toEqual([
        false,
        true,
        true,
        true,
      ]);
    });
  });
});
