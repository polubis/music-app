import { DEFAULT_FRETS_MARKERS, increaseFretsMarkers } from "../core";

describe("increaseFretsMarkers()", () => {
  it("increases frets markers", () => {
    // TODO: FInish this feature and frets range
    expect(increaseFretsMarkers(24, DEFAULT_FRETS_MARKERS)).toEqual([
      3, 5, 7, 9, 12, 15, 17, 19, 21, 24,
    ]);
    expect(increaseFretsMarkers(25, DEFAULT_FRETS_MARKERS)).toEqual([
      3, 5, 7, 9, 12, 15, 17, 19, 21, 24,
    ]);
  });
});
