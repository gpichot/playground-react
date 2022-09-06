import React from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { postPokemon } from "./api";
import PokemonForm from "./PokemonForm";

interface CreateNFTDialogProps
  extends React.ComponentPropsWithRef<typeof Dialog> {
  open: boolean;
  onClose: () => void;
}

export const CreateNFTDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  CreateNFTDialogProps
>(({ open, onClose, ...otherProps }, ref) => {
  const handleSubmit = pokemon => {
    console.log(pokemon);
  };

  return (
    <Dialog ref={ref} open={open} onClose={onClose} {...otherProps}>
      <DialogTitle>Create NFT</DialogTitle>
      <DialogContent>
        <PokemonForm onSubmit={handleSubmit} id="create-nft-form" />
      </DialogContent>
      <DialogActions>
        <Button form="create-nft-form" type="submit">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
});
CreateNFTDialog.displayName = "CreateNFTDialog";

export default CreateNFTDialog;
