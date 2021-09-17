import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { FretboardVisualizer } from "./modules/fretboard-visualizer";

import "antd/dist/antd.css";

import "./index.scss";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FretboardVisualizer />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
