import { Pokemon } from "pokedex-promise-v2";
import React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMessages } from "@/features/messages";
import { useBuyContext } from "./context";

async function sleep() {
  const delay = Math.floor(Math.random() * 1000) + 1000;
  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * TODO-EXO(exo-react-query-mutation)
 * 1. Convertissez le code suivant pour utiliser les mutations react-query.
 * 2. Utilisez le query client pour modifier la query de détail d'un pokemon
 * pour changer son nom dans le cache.
 * FIXME: trouver quelque chose qui fait plus de sens ?
 *
 */

export function BuyForm({ pokemon }: { pokemon: Pokemon }) {
  const buyContext = useBuyContext();
  const messages = useMessages();

  const [amount, setAmount] = React.useState("");
  const [buying, setBuying] = React.useState(false);

  const buy = async () => {
    setBuying(true);
    await sleep();
    try {
      buyContext.buy(`pokemon-${pokemon.id}`, Number(amount));
      messages.success(`You bought ${pokemon.name}!`);
    } catch (e) {
      if (e instanceof Error) {
        messages.error(e.message);
      } else {
        messages.error(`Something went wrong: ${e}`);
      }
    } finally {
      setBuying(false);
    }
  };

  if (buyContext.owns(`pokemon-${pokemon.id}`)) {
    return (
      <div className="buy-form">
        <Message>You have this pokemon!</Message>
      </div>
    );
  }
  return (
    <div className="buy-form">
      <Form loading={buying} onSubmit={buy}>
        <Form.Group>
          <Form.Field required>
            <input
              name="amount"
              type="number"
              placeholder="1.23"
              step="0.01"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              onBlur={e => setAmount(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">Buy</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
