import { Pokemon } from "pokedex-promise-v2";
import React from "react";
import { Card, Icon, Image, Label, Button } from "semantic-ui-react";
import { useImpressionReporter } from "@/features/advertisements";
import { useBuyContext } from "../buy/context";

/**
 * TODO-EXO(exo-refs)
 * Ceci est votre second exercice.
 *
 * Il s'agit ici de logger un événement bien spécifique : on veut logguer
 * toutes les offres Premium qui sont visibles sur l'écran à plus de 70%.
 *
 * Pour cela, utilisez l'API `window.IntersectionObserver`:
 * https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
 *
 * Et appelez la fonction logImpression(pokemon.name) lorsque l'élément est
 * visible.
 */

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const isPremium = pokemon.weight % 7 === 0;
  const impressionReporter = useImpressionReporter();
  const buyContext = useBuyContext();
  const hp = pokemon.stats.find(stat => stat.stat.name === "hp");
  return (
    <Card color={isPremium ? "yellow" : undefined}>
      <Card.Content>
        <Image floated="right" src={pokemon.sprites.front_default} />
        <Card.Header>{pokemon.name}</Card.Header>
        <Card.Meta>
          {pokemon.types.map(type => type.type.name).join(", ")}
        </Card.Meta>
        {isPremium && process.env.NODE_ENV === "development" && (
          <Label color="yellow" ribbon>
            Premium
          </Label>
        )}
        {buyContext.owns(`pokemon-${pokemon.id}`) && (
          <Label color="green" ribbon="right" style={{ marginTop: 60 }}>
            Owned
          </Label>
        )}
      </Card.Content>
      <Card.Content extra>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {hp && (
              <>
                <Icon name="heart" />
                {hp.base_stat}
              </>
            )}
          </div>
          <Button as="a" href={`/detail/${pokemon.id}`} size="mini" secondary>
            More
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
