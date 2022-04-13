import React from "react";
import { Button, Modal } from "semantic-ui-react";

import { SignInForm } from "@/features/common";

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
};

function SignInModal({ open, onClose }: SignInModalProps) {
  const handleSignIn = console.log;
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Sign In</Modal.Header>
      <Modal.Content>
        <SignInForm id="sign-in-modal" hideActions onSubmit={handleSignIn} />
      </Modal.Content>
      <Modal.Actions>
        <Button positive labelPosition="right" form="sign-in-modal">
          Sign in
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default SignInModal;
