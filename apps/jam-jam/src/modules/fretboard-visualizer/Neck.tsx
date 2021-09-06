import React from "react";

import { NoteButton } from "./components";
import { createGuitarString, createGuitarStrings } from "./models";

import css from "./Neck.scss";

// <NoteButton notation="#" position={11} />
// <div className={css.neck}>
//   <div className={css.head}></div>
// </div>

const Neck = () => {
  console.log(
    createGuitarStrings(
      [
        { octave: 4, position: 4 },
        { octave: 3, position: 11 },
        { octave: 3, position: 7 },
        { octave: 3, position: 2 },
        { octave: 2, position: 9 },
        { octave: 2, position: 4 },
      ],
      "#",
      10
    )
  );
  return null;
};

// H W W HW H H -> 7 modus -> E B C C# D D# G -> E

export { Neck };
