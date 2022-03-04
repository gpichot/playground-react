import React from "react";
import { Button, Icon } from "semantic-ui-react";

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
    <Button {...props} icon>
      <Icon name="google" />
      &nbsp; Sign in with Google
    </Button>
  );
}
