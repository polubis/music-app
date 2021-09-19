import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserFormProvider from "./providers/user-form-provider";
import { Form } from "./modules/musicians-finder/components/form/Form";
import { Map } from "./modules/musicians-finder/components/map/Map";
import { FretboardVisualizer } from "./modules/fretboard-visualizer";

import "antd/dist/antd.css";

import "./index.scss";

const App = () => {
  return (
    <UserFormProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <FretboardVisualizer />
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
