import { Suspense } from "react";
import { render } from "react-dom";
import { LoadingLanguageFallback } from "components";

import { App } from "./App";

import "./i18n";

render(
  <Suspense fallback={<LoadingLanguageFallback />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
