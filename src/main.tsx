import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "semantic-ui-css/semantic.min.css";
import "./main.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
