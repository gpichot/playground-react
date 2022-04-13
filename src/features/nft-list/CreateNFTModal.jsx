import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button, Modal } from "semantic-ui-react";

import { postPokemon } from "./api";
import PokemonForm from "./PokemonForm";

export default function CreateNFTModal({ open, onClose }) {
  const handleSubmit = pokemon => {
    console.log(pokemon);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Create NFT</Modal.Header>
      <Modal.Content>
        <PokemonForm onSubmit={handleSubmit} id="create-nft-form" />
      </Modal.Content>
      <Modal.Actions>
        <Button positive form="create-nft-form" type="submit">
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
