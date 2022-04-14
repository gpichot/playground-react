import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./main.css";

import App from "./App";

const element = document.getElementById("root");
if (!element) {
  throw new Error("No root element found");
}
const root = createRoot(element);

const client = new QueryClient({});

root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
