import React from "react";
import { Pokemon } from "pokedex-promise-v2";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";

import { useImpressionReporter } from "@/features/advertisements";
import { useBuyContext } from "@/features/buy/context";

function getColor({
  isFocused,
  isPremium,
  isHovered,
}: {
  isHovered: boolean;
  isFocused: boolean;
  isPremium: boolean;
}) {
  if (isHovered) {
    return "green";
  }
  if (isFocused) {
    return "blue";
  }
  if (isPremium) {
    return "yellow";
  }
  return undefined;
}

export default function NFTCard({
  pokemon,
  ...otherProps
}: {
  pokemon: Pokemon;
}) {
  const isPremium = pokemon.weight % 7 === 0;
  const impressionReporter = useImpressionReporter();
  const buyContext = useBuyContext();
  const hp = pokemon.stats.find(stat => stat.stat.name === "hp");

  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Card
      color={getColor({ isFocused, isHovered, isPremium })}
      {...otherProps}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      raised={isFocused}
      style={{ outline: 0 }}
    >
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
