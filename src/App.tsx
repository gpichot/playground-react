import React from "react";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { BuyContextProvider } from "@/features/buy/context";
import NFTList from "@/features/nft-list/NFTList";

import "semantic-ui-css/semantic.min.css";

import styles from "./App.module.css";

export default function App() {
  return (
    <BuyContextProvider>
      <NavBar />
      <div className={styles.container}>
        <NFTList />
      </div>
      <Footer />
    </BuyContextProvider>
  );
}
