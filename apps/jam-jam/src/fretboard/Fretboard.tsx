import React, { CSSProperties } from "react";
import { Typography } from "antd";
import { GuitarSoundsTheme, GuitarString } from "./models";
import { createFretsMarkers, DEFAULT_THEME, percentage } from "./core";

import css from "./Fretboard.scss";

const { Paragraph } = Typography;

export interface FretboardProps {
  fretsCount: number;
  noteSize?: number;
  strings: GuitarString[];
  theme?: GuitarSoundsTheme;
  markersDisabled?: boolean;
}

const Fretboard = ({
  strings,
  fretsCount,
  noteSize = 32,
  theme = DEFAULT_THEME,
  markersDisabled = false,
}: FretboardProps) => {
  const stringHeight = percentage(noteSize, 2);
  const fretWidth = percentage(noteSize, 12);
  const stringHeightStep = percentage(noteSize, 1.5);
  const stringDistance = noteSize * 2;
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
    if (string.hidden) {
      return null;
    }

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
  const soundFontSize = percentage(fretWidth, 36);
  const Sounds = strings.map((string) => (
    <React.Fragment key={string.position}>
      {string.sounds.map((sound) =>
        sound.hidden ? null : (
          <button
            key={sound.fret}
            className={css.sound}
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
              fontSize: `${soundFontSize}rem`,
              ...theme[sound.note.name],
            }}
          >
            {sound.note.name}
          </button>
        )
      )}
    </React.Fragment>
  ));

  const markerSize = percentage(noteSize, 25);
  const markers = createFretsMarkers(fretsCount, [3, 2, 2, 2, 3]);

  const Markers = markersDisabled
    ? null
    : markers.map((marker, idx) => (
        <div
          key={marker}
          role="none"
          className={`${css.marker} ${
            idx !== 0 && idx % 3 === 0 ? css.doubledMarker : ""
          }`}
          style={{
            height: `${markerSize}px`,
            width: `${markerSize}px`,
            left: `${
              firstFretDistance +
              (marker - 1) * fretDistance +
              fretWidth +
              fretDistance / 2 -
              markerSize / 2
            }px`,
            top: `${height / 2 - markerSize / 2}px`,
          }}
        />
      ));

  const fretIdentifiersY = -(noteSize + percentage(noteSize, 50));
  const fretIdentifierSize = percentage(noteSize, 90);
  const fretIdentifierFontSize = percentage(fretWidth, 30);
  const FretIdentifiers = Array.from({ length: fretsCount + 1 }).map(
    (_, idx) => (
      <div
        className={css.fretIdentifier}
        key={idx}
        data-identifier={idx}
        style={{
          bottom: `${fretIdentifiersY}px`,
          left: `${
            idx === 0
              ? firstFretDistance / 2 - fretIdentifierSize / 2
              : idx * fretDistance + fretWidth
          }px`,
          height: `${fretIdentifierSize}px`,
          width: `${fretIdentifierSize}px`,
          fontSize: `${fretIdentifierFontSize}rem`,
        }}
      >
        <Paragraph>{idx}</Paragraph>
      </div>
    )
  );

  return (
    <div className={css.container}>
      <div className={css.fretboard} style={fretboardStyle}>
        {Frets}
        {Strings}
        {Markers}
        {Sounds}
        {FretIdentifiers}
      </div>
    </div>
  );
};

export { Fretboard };
