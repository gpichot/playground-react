import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Label, Ref } from "semantic-ui-react";

import { useBuyContext } from "@/features/buy/context";

import useNotifyImpression from "../hooks/useNotifyImpression";
import { NFT } from "../types";
import { isNFTPremium } from "../utils";

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

export default function NFTCard({ pokemon, ...otherProps }: { pokemon: NFT }) {
  const isPremium = isNFTPremium(pokemon);
  const buyContext = useBuyContext();
  const hp = pokemon.stats.find(stat => stat.stat.name === "hp");

  const ref = useNotifyImpression({ isPremium, nftID: String(pokemon.id) });

  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Ref innerRef={ref}>
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
          {pokemon.sprites.front_default && (
            <img
              src={pokemon.sprites.front_default}
              className="ui image floated right"
              alt={pokemon.name}
            />
          )}
          <Card.Header>{pokemon.name}</Card.Header>
          <Card.Meta>
            {pokemon.types.map(type => type.type.name).join(", ")}
          </Card.Meta>
          {isPremium && (
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
            <Link to={`/detail/${pokemon.id}`}>
              <Button size="mini" secondary>
                More
              </Button>
            </Link>
          </div>
        </Card.Content>
      </Card>
    </Ref>
  );
}
