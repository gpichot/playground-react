import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render as rtlRender } from "@testing-library/react";

import { BuyContextProvider } from "@/features/buy/context";
import { MessagesProvider } from "@/features/messages";

export function render(
  ui: Parameters<typeof rtlRender>[0],
  options?: Parameters<typeof rtlRender>[1]
) {
  return rtlRender(
    <MessagesProvider>
      <BuyContextProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </BuyContextProvider>
    </MessagesProvider>,
    options
  );
}
