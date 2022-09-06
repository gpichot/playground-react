import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";

/**
 * TODO-EXO(CSS Modules)
 * 1. Utilisez les CSS Modules pour changer la couleur de ce bouton avec la
 * couleur en rouge.
 *
 * Bonus:
 * 2. Faites la même chose avec styled-components
 */

export type GoogleSignInButtonProps = {
  /**
   * On click handler
   */
  onClick: () => void;
  /**
   * If button is disabled
   */
  disabled?: boolean;
};

export function GoogleSignInButton(props: GoogleSignInButtonProps) {
  return (
    <Button {...props}>
      <GoogleIcon />
      &nbsp; Sign in with Google
    </Button>
  );
}
