import React from "react";
import ReactDOM from "react-dom";
import { FretboardVisualizer } from "./fretboard-visualizer";
import { createStrings } from "./fretboard/core";

import "./styles/index.scss";

const strings = createStrings(["E", "B", "G", "D", "A", "E"], 24);

const App = () => {
  return (
    <div>
      <FretboardVisualizer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
