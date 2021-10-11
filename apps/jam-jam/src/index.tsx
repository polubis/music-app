import { render } from "react-snapshot";

import { App } from "./App";

import "./i18n";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();
