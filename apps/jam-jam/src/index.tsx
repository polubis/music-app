import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.scss";
import { FretboardVisualizer as FirstFretboardVisualizer } from "./fretboard-visualizer";
import { Neck } from "./modules/fretboard-visualizer/Neck";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/fretboard-visualizer">
          <Neck />
        </Route>
        <Route exact path="/">
          <FirstFretboardVisualizer />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
