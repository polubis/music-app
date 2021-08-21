import React from "react";
import ReactDOM from "react-dom";
import { createStrings, Fretboard } from "./fretboard";

import "./styles/index.scss";

const strings = createStrings(["E", "B", "G", "D", "A", "E"], 24);

const App = () => {
  return (
    <div>
      <Fretboard strings={strings} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
