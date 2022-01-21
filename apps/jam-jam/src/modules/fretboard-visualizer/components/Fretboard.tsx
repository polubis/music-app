import { GuitarString, Note } from "../models";
import { NoteButton } from "./NoteButton";

import css from "./Fretboard.module.less";

interface FretboardProps {
  className?: string;
  leftHanded?: boolean;
  octavesDisplayed?: boolean;
  strings: GuitarString[];
  unclickable?: boolean;
  onNoteClick?: (note: Note) => void;
}

const MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24].reduce<
  Record<number, boolean>
>((acc, marker) => ({ ...acc, [marker]: true }), {});

const Fretboard = ({
  className = "",
  leftHanded,
  octavesDisplayed,
  unclickable,
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
          <div
            key={fretIdx}
            className={`${css.fret} ${MARKERS[fretIdx] ? css.markedFret : ""}`}
          >
            {notes.map((note) => (
              <NoteButton
                className={`${css.note} ${unclickable ? css.unclickable : ""}`}
                uncolored={note.hidden}
                ghosty={note.hidden}
                octave={octavesDisplayed ? note.octave : undefined}
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
