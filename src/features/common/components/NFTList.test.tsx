import React from "react";
import { screen } from "@testing-library/react";

import { nftsListMock } from "@/features/nft-list/mocks";
import { render } from "@/test/utils";

import usePaginatedPokemons from "../hooks/usePaginatedPokemons";
import NFTList from "./NFTList";

jest.mock("../hooks/usePaginatedPokemons");
jest.mock("../hooks/useNotifyImpression");

// Required for TypeScript
const mockUsePaginatedPokemons = usePaginatedPokemons as jest.Mock;

describe("NFTList", () => {
  it("show loading", () => {
    mockUsePaginatedPokemons.mockReturnValue({
      isLoading: true,
    });
    render(<NFTList />);

    expect(screen.getByText("Loading...")).toBeVisible();
  });

  it("show pokemons", () => {
    mockUsePaginatedPokemons.mockReturnValue({
      isLoading: false,
      isError: false,
      data: nftsListMock,
    });
    render(<NFTList />);

    expect(screen.queryAllByText("ivysaur")[0]).toBeVisible();
  });
});
