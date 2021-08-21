import React from "react";
import { CSSProperties } from "react";
import { GuitarSound, GuitarString, GuitarTuning, NOTE_NAMES } from "./models";

import css from "./Fretboard.scss";

export interface FretboardProps {
  fretDistance?: number;
  noteSize?: number;
  stringDistance?: number;
  strings: GuitarString[];
}

export const createStrings = (
  tuning: GuitarTuning,
  frets: number
): GuitarString[] => {
  const strings: GuitarString[] = [];

  for (let i = 0; i < tuning.length; i++) {
    const sound = tuning[i];
    let acc = NOTE_NAMES.findIndex((currSound) => currSound === sound);
    const sounds: GuitarSound[] = [];

    for (let j = 0; j <= frets; j++) {
      sounds.push({
        fret: j,
        note: {
          name: NOTE_NAMES[acc],
          position: acc,
        },
        theme: {
          background: "red",
          color: "#000",
        },
      });
      const nextAcc = acc + 1;
      acc = nextAcc > NOTE_NAMES.length - 1 ? 0 : nextAcc;
    }

    strings.push({ position: i, sounds });
  }

  return strings;
};

export const FIRST_FRET_DISTANCE_DIFF = 25;

export const percentValue = (value: number, percent: number): number =>
  (value * percent) / 100;

const Fretboard = ({
  strings,
  fretDistance = 80,
  stringDistance = 60,
  noteSize = 32,
}: FretboardProps) => {
  if (strings.length === 0) {
    throw new Error("Strings must be always defined");
  }

  const stringHeight = percentValue(noteSize, 2);
  const fretWidth = percentValue(noteSize, 12);
  const stringHeightStep = percentValue(noteSize, 1.5);
  const fretsCount = strings[0].sounds.length - 1;
  const height = stringDistance * strings.length;
  const firstFretDistance = fretDistance - FIRST_FRET_DISTANCE_DIFF;
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
      data-testid="fret"
    />
  ));

  const Strings = strings.map((string) => {
    const height = stringHeight + stringHeightStep * string.position;

    return (
      <div
        key={string.position}
        className={css.string}
        data-testid="string"
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
  const Sounds = strings.map((string) => (
    <React.Fragment key={string.position}>
      {string.sounds.map((sound) => (
        <button
          key={sound.fret}
          className={css.sound}
          style={{
            left: `${
              sound.fret === 0 ? leftDistance : sound.fret * fretDistance
            }px`,
            top: `${topDistance / 2 + string.position * stringDistance}px`,
            height: `${noteSize}px`,
            width: `${noteSize}px`,
            ...sound.theme,
          }}
        >
          {sound.note.name}
        </button>
      ))}
    </React.Fragment>
  ));

  return (
    <div className={css.container}>
      <div
        className={css.fretboard}
        style={fretboardStyle}
        data-testid="fretboard"
      >
        {Frets}
        {Strings}
        {Sounds}
      </div>
    </div>
  );
};

export { Fretboard };
