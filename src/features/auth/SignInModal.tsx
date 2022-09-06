import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { SignInForm } from "@/features/common";

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
};

function SignInModal({ open, onClose }: SignInModalProps) {
  const handleSignIn = console.log;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <SignInForm id="sign-in-modal" hideActions onSubmit={handleSignIn} />
      </DialogContent>
      <DialogActions>
        <Button form="sign-in-modal">Sign in</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignInModal;
