import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

import SignInModal from "@/features/auth/SignInModal";
import { useBuyContext } from "@/features/buy/context";

function NavBar() {
  const [signInModalOpen, setSignInModalOpen] = React.useState(false);
  const { isLoaded, balance } = useBuyContext();
  return (
    <>
      <Menu fixed="top" inverted size="large">
        <Container>
          <Item href="/">Home</Item>
          {/*
          <Item href="/account">
            Account&nbsp;{" "}
            {isLoaded && <span id="account-balance">({balance})</span>}
            </Item>*/}
          {/*
              <Item href="/sell/top">Top Sell</Item>*/}
          {/*
          <Menu.Item position="right">
            <Button inverted onClick={() => setSignInModalOpen(true)}>
              Log in
            </Button>
            <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
              Sign Up
            </Button>
          </Menu.Item>
          */}
        </Container>
      </Menu>
      <SignInModal
        open={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
      />
    </>
  );
}

function Item({ children, href }: { children: React.ReactNode; href: string }) {
  const resolved = useResolvedPath(href);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Menu.Item as={Link} to={href} active={Boolean(match)}>
      {children}
    </Menu.Item>
  );
}

export default NavBar;
