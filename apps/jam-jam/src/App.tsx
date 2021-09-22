import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import UserFormProvider from "providers/user-form-provider";
import { Form } from "modules/musicians-finder/components/form/Form";
import { Map } from "modules/musicians-finder/components/map/Map";
import { FretboardVisualizer } from "modules/fretboard-visualizer";
import { initialize } from "react-ga";
import "./App.less";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    initialize("UA-200798883-1");
  }, []);

  return (
    <CookiesProvider>
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
    </CookiesProvider>
  );
};
