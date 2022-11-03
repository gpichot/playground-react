import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider as BaseQueryClientProvider,
  QueryClientProviderProps,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import "./main.css";

import Board from "./features/perf/Board";
import App from "./App";

const element = document.getElementById("root");
if (!element) {
  throw new Error("No root element found");
}
const root = createRoot(element);

const client = new QueryClient({});

// Temporary fix
const QueryClientProvider = BaseQueryClientProvider as React.FC<
  QueryClientProviderProps & { children: React.ReactNode }
>;

root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Board />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
