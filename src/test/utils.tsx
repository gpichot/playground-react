import React from "react";
import {
  MemoryRouter,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { render as rtlRender } from "@testing-library/react";

import { BuyContextProvider } from "@/features/buy/context";
import { MessagesProvider } from "@/features/messages";

import type { History } from "history";

export function render(
  ui: Parameters<typeof rtlRender>[0],
  options?: Parameters<typeof rtlRender>[1] & {
    history?: History;
  }
) {
  const { history, ...renderOptions } = options || {};
  const FinalRouter = history
    ? ({ children }: { children: React.ReactNode }) => (
        <HistoryRouter history={history}>{children}</HistoryRouter>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>{children}</MemoryRouter>
      );
  return rtlRender(
    <MessagesProvider>
      <BuyContextProvider>
        <FinalRouter>{ui}</FinalRouter>
      </BuyContextProvider>
    </MessagesProvider>,
    renderOptions
  );
}
