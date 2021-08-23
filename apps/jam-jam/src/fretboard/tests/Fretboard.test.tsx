import React from "react";
import { render } from "@testing-library/react";

import { Fretboard, FretboardProps } from "../Fretboard";
import { GuitarString } from "../models";
import { GuitarStringsMock } from "./mocks";
import { DEFAULT_FRETS_MARKERS, DEFAULT_THEME } from "../core";

describe("<Fretboard>", () => {
  const _FRETS_COUNT_ = 24;

  const _STRINGS_: GuitarString[] = GuitarStringsMock()
    .fromNames(["E", "B", "G", "D", "A", "E"], _FRETS_COUNT_)
    .valueOf();

  const _FRETBOARD_PROPS_: Required<FretboardProps> = {
    fretsCount: _FRETS_COUNT_,
    strings: _STRINGS_,
    noteSize: 32,
    theme: DEFAULT_THEME,
    fretsMarkers: DEFAULT_FRETS_MARKERS,
  };

  const renderFretboard = (props: Partial<FretboardProps> = {}) =>
    render(<Fretboard {..._FRETBOARD_PROPS_} {...props} />);

  it("contains data-string attribute attached to every string", () => {
    const { container } = renderFretboard();

    expect(container.querySelectorAll(`[data-string]`).length).toBe(
      _STRINGS_.length
    );
  });

  it("draws frets", () => {
    const { container } = renderFretboard();

    expect(container.querySelectorAll(`[data-fret]`).length).toBe(
      _FRETBOARD_PROPS_.fretsCount
    );
  });

  it("draws sounds", () => {
    const { getAllByRole } = renderFretboard();

    expect(getAllByRole("button").length).toBe(
      _STRINGS_.length * _FRETBOARD_PROPS_.fretsCount
    );
  });

  it("draws every next string with bigger height", () => {
    const { container } = renderFretboard();

    const [first, second] = [
      getComputedStyle(container.querySelector(`[data-string="0"]`)!),
      getComputedStyle(container.querySelector(`[data-string="1"]`)!),
    ];

    expect(first.height < second.height).toBeTruthy();
  });
});
