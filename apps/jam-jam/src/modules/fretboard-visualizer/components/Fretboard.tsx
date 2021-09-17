import React from "react";

import { GuitarString, Note } from "../models";
import { NoteButton } from "./NoteButton";

import css from "./Fretboard.scss";

interface FretboardProps {
  className?: string;
  leftHanded?: boolean;
  strings: GuitarString[];
  onNoteClick?: (note: Note) => void;
}

const MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24].reduce<
  Record<number, boolean>
>((acc, marker) => ({ ...acc, [marker]: true }), {});

const Fretboard = ({
  className = "",
  leftHanded,
  strings,
  onNoteClick = () => {},
}: FretboardProps) => {
  const notesCount = strings[0].notes.length;

  const frets = Array.from({ length: notesCount }).reduce<Note[][]>(
    (acc, _, idx): Note[][] => [
      ...acc,
      strings.map((string) => string.notes[idx]),
    ],
    []
  );

  return (
    <div
      className={`${css.container} ${className} ${
        leftHanded ? css.rotated : ""
      }`}
    >
      <div className={css.fretboard}>
        {frets.map((notes, fretIdx) => (
          <div key={fretIdx} className={css.fret}>
            {notes.map((note) => (
              <NoteButton
                className={css.note}
                style={{
                  visibility: note.hidden ? "hidden" : "visible",
                }}
                key={note.id}
                position={note.position}
                notation={note.notation}
                onClick={() => onNoteClick(note)}
              />
            ))}
            {MARKERS[fretIdx] && (
              <div
                className={`${css.marker} ${
                  fretIdx % 12 === 0 ? css.halfMarker : ""
                }`}
              >
                {fretIdx}
              </div>
            )}
          </div>
        ))}

        <div className={css.strings}>
          {strings.map((string) => (
            <span key={string.id} className={css.string} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Fretboard };
