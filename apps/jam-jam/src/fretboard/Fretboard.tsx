import React from "react";
import { CSSProperties } from "react";
import { FretsMarkers, GuitarSoundsTheme, GuitarString } from "./models";
import { DEFAULT_FRETS_MARKERS, DEFAULT_THEME, percentage } from "./core";

import css from "./Fretboard.scss";

export interface FretboardProps {
  fretsCount: number;
  noteSize?: number;
  strings: GuitarString[];
  theme?: GuitarSoundsTheme;
  fretsMarkers?: FretsMarkers;
}

const Fretboard = ({
  strings,
  fretsCount,
  noteSize = 32,
  theme = DEFAULT_THEME,
  fretsMarkers = DEFAULT_FRETS_MARKERS,
}: FretboardProps) => {
  const stringHeight = percentage(noteSize, 2);
  const fretWidth = percentage(noteSize, 12);
  const stringHeightStep = percentage(noteSize, 1.5);
  const stringDistance = noteSize * 2 - percentage(noteSize, 20);
  const height = stringDistance * strings.length;
  const fretDistance = noteSize * 2 + percentage(noteSize, 50);
  const firstFretDistance = fretDistance - percentage(noteSize, 75);
  const firstStringDistance = stringDistance / 2;
  const width = fretDistance * fretsCount - 1 + firstFretDistance;

  const fretboardStyle: CSSProperties = {
    height: `${height}px`,
    width: `${width}px`,
  };

  const Frets = Array.from({ length: fretsCount }).map((_, fretIdx) => (
    <div
      key={fretIdx}
      className={css.fret}
      style={{
        left: `${firstFretDistance + fretIdx * fretDistance}px`,
        width: `${fretWidth}px`,
      }}
      data-fret={fretIdx}
    />
  ));

  const Strings = strings.map((string) => {
    const height = stringHeight + stringHeightStep * string.position;

    return (
      <div
        key={string.position}
        className={css.string}
        data-string={string.position}
        style={{
          top: `${
            firstStringDistance - height / 2 + string.position * stringDistance
          }px`,
          height: `${height}px`,
        }}
      />
    );
  });

  const leftDistance = noteSize / 2 - fretWidth;
  const topDistance = firstStringDistance;
  const fontSize = percentage(fretWidth, 36);
  const Sounds = strings.map((string) => (
    <React.Fragment key={string.position}>
      {string.sounds.map((sound) => (
        <button
          key={sound.fret}
          className={`${css.sound} ${sound.hidden ? css.hidden : ""}`}
          role="button"
          style={{
            left: `${
              sound.fret === 0
                ? leftDistance
                : sound.fret * fretDistance + fretWidth
            }px`,
            top: `${topDistance / 2 + string.position * stringDistance}px`,
            height: `${noteSize}px`,
            width: `${noteSize}px`,
            fontSize: `${fontSize}rem`,
            ...theme[sound.note.name],
          }}
        >
          {sound.note.name}
        </button>
      ))}
    </React.Fragment>
  ));

  return (
    <div className={css.container}>
      <div className={css.fretboard} style={fretboardStyle}>
        {Frets}
        {Strings}
        {Sounds}
      </div>
    </div>
  );
};

export { Fretboard };
