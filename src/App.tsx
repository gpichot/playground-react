import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";
import "semantic-ui-css/semantic.min.css";

import styles from "./App.module.css";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

import { BuyContextProvider } from "@/features/buy/context";
import { NFTList } from "@/features/nft-list/NFTList";
import { NFTDetail } from "@/features/nft-list/NFTDetail";
import { Account } from "@/features/account/Account";
import TopSellList from "./features/buy/TopSellList";

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
              <Route path="/" element={<NFTList />} />
              <Route path="/detail/:pokemonId" element={<NFTDetail />} />
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
