import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";
import "semantic-ui-css/semantic.min.css";

import styles from "./App.module.css";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

import { BuyContextProvider } from "@/features/buy/context";
import { PokemonList } from "@/features/nft-list/PokemonList";
import { PokemonDetail } from "@/features/nft-list/PokemonDetail";
import { Account } from "@/features/account/Account";
import TopSellList from "./features/buy/TopSellList";

// TODO(exo-context): 5. Ajouter le context Messages au composant App.

const client = new QueryClient({});
export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <BuyContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <NavBar />
          <div className={styles.container}>
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/detail/:pokemonId" element={<PokemonDetail />} />
              <Route path="/account" element={<Account />} />
              <Route path="/sell/top" element={<TopSellList />} />
            </Routes>
          </div>
          <Footer />
        </BuyContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
