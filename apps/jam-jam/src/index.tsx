import { Suspense } from "react";
import ReactDOM from "react-dom";

import { LoadingLanguageFallback } from "components";

import { App } from "./App";

import "./i18n";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <Suspense fallback={<LoadingLanguageFallback />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();