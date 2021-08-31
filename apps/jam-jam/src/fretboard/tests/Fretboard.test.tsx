import React from "react";
import { render } from "@testing-library/react";

import { Fretboard, FretboardProps } from "../Fretboard";
import { GuitarString } from "../models";
import { GuitarStringsMock } from "./mocks";
import { DEFAULT_THEME } from "../core";

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
    markersDisabled: false,
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

  it("hiddes sounds which have dedicated flag set as truthy", () => {
    const _FRETS_COUNT_ = 5;
    const _STRINGS_ = GuitarStringsMock()
      .fromNames(["E", "B", "G", "D", "A", "E"], _FRETS_COUNT_)
      .setSoundsHidden(["C"], true)
      .valueOf();

    const { queryByText } = renderFretboard({
      fretsCount: _FRETS_COUNT_,
      strings: _STRINGS_,
    });

    expect(queryByText("C")).not.toBeInTheDocument();
  });

  it("hiddes strings which have dedicated flag set as truthy", () => {
    const _FRETS_COUNT_ = 5;
    const _STRINGS_ = GuitarStringsMock()
      .fromNames(["E", "B", "G", "D", "A", "E"], _FRETS_COUNT_)
      .setStringsHidden([0, 1], true)
      .valueOf();

    const { container } = renderFretboard({
      fretsCount: _FRETS_COUNT_,
      strings: _STRINGS_,
    });

    expect(container.querySelectorAll(`[data-string]`).length).toBe(4);
  });

  it("draws identifiers", () => {
    const { container } = renderFretboard();

    expect(container.querySelectorAll(`[data-identifier]`).length).toBe(
      _FRETBOARD_PROPS_.fretsCount + 1
    );
  });

  it("draws markers when enabled", () => {
    const { getAllByRole } = renderFretboard();

    expect(getAllByRole("none").length).toBe(10);
  });

  it("ignore markers draw when dedicated flag is passed as truthy", () => {
    const { queryByRole } = renderFretboard({ markersDisabled: true });

    expect(queryByRole("none")).not.toBeInTheDocument();
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
