import React from "react";
import { Router } from "react-router-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import { Bulbasaur, Ivysaur } from "@/features/nft-list/mocks";
import { render } from "@/test/utils";

import NFTCard from "./NFTCard";

jest.mock("../hooks/useNotifyImpression");

describe("NFTCard", () => {
  it("displays NFT name", () => {
    render(<NFTCard pokemon={Bulbasaur} />);

    expect(screen.getByText("bulbasaur")).toBeVisible();
  });

  it("displays premium label", () => {
    render(<NFTCard pokemon={Ivysaur} />);

    expect(screen.getByText("Premium")).toBeVisible();
  });

  it("goes to nft details page when click on more", async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory();
    render(<NFTCard pokemon={Bulbasaur} />, { history });

    await user.click(screen.getByText("More"));

    expect(history.location.pathname).toBe("/detail/1");
  });
});
