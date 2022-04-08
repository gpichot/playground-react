import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Message, Modal } from "semantic-ui-react";

import { GoogleSignInButton } from "./GoogleSignInButton";

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function SignInModal({ open, onClose }: SignInModalProps) {
  if (typeof GOOGLE_CLIENT_ID !== "string") {
    throw new Error("Missing GOOGLE_CLIENT_ID environment variable");
  }
  const [error, setError] = React.useState<string | null>(null);

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    // TODO(exo-context): 6. Utiliser le context Messages pour afficher un
    // message "Connecté" lorsque l'utilisateur se connecte avec Google.
  };
  const onFailure = (response: { error: string }) => {
    setError(response?.error);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Sign In</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            render={renderProps => <GoogleSignInButton {...renderProps} />}
          />
          {error && (
            <Message negative>
              <p>{error}</p>
            </Message>
          )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default SignInModal;
