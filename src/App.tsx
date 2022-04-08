import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Account } from "@/features/account/Account";
import { BuyContextProvider } from "@/features/buy/context";
import { NFTDetail } from "@/features/nft-list/NFTDetail";
import { NFTList } from "@/features/nft-list/NFTList";

import "semantic-ui-css/semantic.min.css";

import TopSellList from "./features/buy/TopSellList";

import styles from "./App.module.css";

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
