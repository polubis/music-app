import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import AuthProvider from "providers/auth-provider";
import { RegisterForm, LoginForm } from "modules/musicians-finder/components/forms";
import { Map } from "modules/musicians-finder/components/map/Map";
import { FretboardVisualizer } from "modules/fretboard-visualizer";

import "./App.less";

export const App = () => {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <FretboardVisualizer />
            </Route>
            <Route exact path="/register">
              <RegisterForm />
            </Route>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/map">
              <Map />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </CookiesProvider>
  );
};
