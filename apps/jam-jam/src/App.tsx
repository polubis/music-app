import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import UserFormProvider from "providers/user-form-provider";
import { MusiciansFinder } from "modules/musicians-finder/MusiciansFinder";
import { FretboardVisualizer } from "modules/fretboard-visualizer";

import "./App.less";

export const App = () => {
  return (
    <CookiesProvider>
      <UserFormProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <FretboardVisualizer />
            </Route>
            <MusiciansFinder />
          </Switch>
        </Router>
      </UserFormProvider>
    </CookiesProvider>
  );
};
