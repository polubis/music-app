import {
  getNextPosition,
  isSharpNoteNameSymbol,
  isNotePositionSymbol,
  isBmollNoteNameSymbol,
  getNextOctave,
  getPosition,
} from "./utils";

describe("getNextPosition()", () => {
  it("gets next position", () => {
    expect(getNextPosition(0)).toBe(1);
  });

  it("when last position resets to first one", () => {
    expect(getNextPosition(11)).toBe(0);
  });
});

describe("isNotePositionSymbol()", () => {
  it("detects symbol", () => {
    expect(isNotePositionSymbol(0)).toBeTruthy();
    expect(isNotePositionSymbol(1)).toBeTruthy();
    expect(isNotePositionSymbol("C")).toBeFalsy();
    expect(isNotePositionSymbol("C#")).toBeFalsy();
    expect(isNotePositionSymbol("Db")).toBeFalsy();
  });
});

describe("isSharpNoteNameSymbol()", () => {
  it("detects symbol", () => {
    expect(isSharpNoteNameSymbol("C#")).toBeTruthy();
    expect(isSharpNoteNameSymbol("C")).toBeTruthy();
    expect(isSharpNoteNameSymbol(0)).toBeFalsy();
    expect(isSharpNoteNameSymbol(1)).toBeFalsy();
    expect(isSharpNoteNameSymbol("Db")).toBeFalsy();
  });
});

describe("isBmollNoteNameSymbol()", () => {
  it("detects symbol", () => {
    expect(isBmollNoteNameSymbol("Bb")).toBeTruthy();
    expect(isBmollNoteNameSymbol("C")).toBeTruthy();
    expect(isBmollNoteNameSymbol(0)).toBeFalsy();
    expect(isBmollNoteNameSymbol(1)).toBeFalsy();
    expect(isBmollNoteNameSymbol("C#")).toBeFalsy();
  });
});

describe("getNextOctave()", () => {
  it("gets next octave", () => {
    expect(getNextOctave(0)).toBe(1);
  });

  it("when last octave resets to first one", () => {
    expect(getNextOctave(8)).toBe(0);
  });
});

describe("getPosition()", () => {
  it("gets position from symbols", () => {
    expect(getPosition("D#")).toBe(3);
    expect(getPosition(3)).toBe(3);
    expect(getPosition("Eb")).toBe(3);
  });
});
