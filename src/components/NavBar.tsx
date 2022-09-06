import React from "react";
import {
  Link as RouterLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Link,
  MenuItem,
  Toolbar,
} from "@mui/material";

import SignInModal from "@/features/auth/SignInModal";
import { useBuyContext } from "@/features/buy/context";
import CreateNFTModal from "@/features/nft-list/CreateNFTModal";

function NavBar() {
  const [signInModalOpen, setSignInModalOpen] = React.useState(false);
  const [createNFTModalOpen, setCreateNFTModalOpen] = React.useState(false);
  const { isLoaded, balance } = useBuyContext();
  const modalRef = React.useRef(null);
  React.useEffect(() => console.log(modalRef.current), []);
  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar variant="dense">
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} sm={6}>
                <nav style={{ flexGrow: 1 }}>
                  <Item href="/">Home</Item>
                  {/*
          <Item href="/account">
            Account&nbsp;{" "}
            {isLoaded && <span id="account-balance">({balance})</span>}
            </Item>*/}
                  <Button onClick={() => setCreateNFTModalOpen(true)}>
                    Create NFT
                  </Button>
                  {/*
              <Item href="/sell/top">Top Sell</Item>*/}
                </nav>
              </Grid>
              <Grid item xs={12} sm={6}>
                <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => setSignInModalOpen(true)}>
                    Sign in
                  </Button>
                  <Button
                    component="a"
                    href="#"
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </nav>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <SignInModal
        open={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
      />
      <CreateNFTModal
        ref={modalRef}
        open={createNFTModalOpen}
        onClose={() => setCreateNFTModalOpen(false)}
      />
    </>
  );
}

function Item({ children, href }: { children: React.ReactNode; href: string }) {
  const resolved = useResolvedPath(href);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      href={href}
      color={match ? "text.secondary" : "text.primary"}
      variant="button"
      sx={{ my: 1, mx: 1.5 }}
    >
      {children}
    </Link>
  );
}

export default NavBar;
