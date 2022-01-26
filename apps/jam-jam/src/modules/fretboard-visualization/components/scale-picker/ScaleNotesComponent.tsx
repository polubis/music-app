import { Button } from "antd";
import { GuitarNote, POSITIONS, OCTAVES, NoteNotationSymbol } from "music-core";
import css from "./ScaleNotesComponent.module.less";

const NOTES = POSITIONS.map(
  (position) => new GuitarNote(position, OCTAVES[4], position)
);

const ScaleNotesComponent = () => {
  return (
    <div className={css.root}>
      {NOTES.map((note) => (
        <Button
          className={css.btn}
          key={note.position}
          type="primary"
          ghost
          value={note.position}
        >
          {note.sharpName}
          {note.sharpName.includes(NoteNotationSymbol.Sharp)
            ? ` / ${note.bmollName}`
            : ""}
        </Button>
      ))}
    </div>
  );
};

export { ScaleNotesComponent };
