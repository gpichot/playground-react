import React from "react";
import { Modal } from "semantic-ui-react";

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
};

function SignInModal({ open, onClose }: SignInModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Sign In</Modal.Header>
      <Modal.Content>
        <Modal.Description></Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default SignInModal;
