import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/index.scss";
import UserFormProvider from "./providers/user-form-provider";
import { FretboardVisualizer as FirstFretboardVisualizer } from "./fretboard-visualizer";
import { Neck } from "./modules/fretboard-visualizer/Neck";
import { Form } from "./modules/musicians-finder/components/form/Form";
import { Map } from "./modules/musicians-finder/components/map/Map";

const App = () => {
  return (
    <UserFormProvider>
      <Router>
        <Switch>
          <Route exact path="/fretboard-visualizer">
            <Neck />
          </Route>
          <Route exact path="/">
            <FirstFretboardVisualizer />
          </Route>
          <Route exact path="/form">
            <Form />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
        </Switch>
      </Router>
    </UserFormProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
