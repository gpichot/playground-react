import React from "react";
import { Router } from "react-router-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import { Bulbasaur } from "@/features/nft-list/mocks";
import { render } from "@/test/utils";

import NFTCard from "./NFTCard";

describe("NFTCard", () => {
  it("displays NFT name", () => {
    render(<NFTCard pokemon={Bulbasaur} />);

    expect(screen.getByText("bulbasaur")).toBeVisible();
  });

  it.todo("displays premium label");

  it("goes to nft details page when click on more", async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/"}>
        <NFTCard pokemon={Bulbasaur} />
      </Router>
    );

    await user.click(screen.getByText("More"));

    expect(history.location.pathname).toBe("/nft/1");
  });
});
