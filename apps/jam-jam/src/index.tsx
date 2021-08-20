import React from "react";
import ReactDOM from "react-dom";
import { Fretboard } from "./fretboard";

import "./styles/index.scss";

const App = () => {
  return (
    <div>
      <Fretboard />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
