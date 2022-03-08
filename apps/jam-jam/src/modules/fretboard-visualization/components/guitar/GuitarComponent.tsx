import { NoteButtonComponent } from "../note-button";
import { Note, NoteNotationSymbol } from "music-core";
import css from "./GuitarComponent.module.less";
import { GuitarSettingsComponent } from "../guitar-settings";
import { MarkerComponent, MARKERS } from "../marker";
import { GuitarStringsComponent } from "../guitar-strings";
import {
  useGuitarProvider,
  GuitarSettingsProvider,
  useGuitarSettingsProvider,
  useNotesPlayProvider,
} from "modules/fretboard-visualization/providers";
import { useEffect, useState } from "react";
import { useSubject } from "dk";

const GuitarComponent = () => {
  const { guitar } = useGuitarProvider();
  const {
    singleColor,
    soundEnabled,
    octavesDisplayed,
    notation,
    availableFrets,
    hiddenNotes,
    toggleFilterProp,
    toggleHiddenNotes,
  } = useGuitarSettingsProvider();
  const [frets, setFrets] = useState(guitar.frets);
  const [fretsChanged, fretsChanged$] = useSubject<Note[][]>();

  const { playNotes } = useNotesPlayProvider();

  const handleNoteClick = (note: Note): void => {
    soundEnabled ? playNotes(note) : toggleHiddenNotes(note.position);
  };

  const handleSoundEnabledChange = (): void => {
    toggleFilterProp("soundEnabled");
  };

  useEffect(() => {
    const sub = fretsChanged$.subscribe((fretsSetter) => {
      setFrets(fretsSetter);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fretsChanged.next(guitar.frets);
  }, [guitar]);

  const [startAvailableFret, endAvailableFret] = availableFrets;

  return (
    <>
      <GuitarSettingsComponent
        onSoundEnabledChange={handleSoundEnabledChange}
      />

      <div className={css.container}>
        <div className={css.fretboard}>
          {frets.map((notes, fretIdx) => (
            <div
              key={fretIdx}
              className={`${css.fret} ${
                MARKERS[fretIdx] ? css.markedFret : ""
              }`}
            >
              {notes.map((note) => (
                <NoteButtonComponent
                  className={css.note}
                  key={note.id}
                  singleColor={singleColor}
                  unavailable={
                    !(
                      fretIdx >= startAvailableFret &&
                      fretIdx <= endAvailableFret
                    )
                  }
                  name={
                    notation === NoteNotationSymbol.Sharp
                      ? note.sharpName
                      : note.bmollName
                  }
                  position={note.position}
                  hidden={hiddenNotes[note.position]}
                  octave={octavesDisplayed ? note.octave : undefined}
                  onClick={() => handleNoteClick(note)}
                />
              ))}
              <MarkerComponent fret={fretIdx} />
            </div>
          ))}
          <GuitarStringsComponent
            amount={guitar.tuning.notes.length}
            rotated={guitar.hand === "left"}
          />
        </div>
      </div>
    </>
  );
};

const ConnectedGuitarComponent = () => (
  <GuitarSettingsProvider>
    <GuitarComponent />
  </GuitarSettingsProvider>
);

export { ConnectedGuitarComponent as GuitarComponent };
