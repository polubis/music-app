import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import UserFormProvider from "providers/user-form-provider";
import { Form } from "modules/musicians-finder/components/form/Form";
import { Map } from "modules/musicians-finder/components/map/Map";
import FretboardVisualization from "modules/fretboard-visualization";

import "./App.less";

export const App = () => {
  return (
    <CookiesProvider>
      <UserFormProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <FretboardVisualization />
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
