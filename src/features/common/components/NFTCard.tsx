import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
} from "@mui/material";

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

function useIsHoveredValue() {
  const [isHovered, setIsHovered] = React.useState(false);
  const onLeave = () => setIsHovered(false);
  const onEnter = () => setIsHovered(true);
  React.useDebugValue({ isHovered });
  return { isHovered, onLeave, onEnter };
}

export const NFTCard = React.memo(
  ({ pokemon, ...otherProps }: { pokemon: NFT }) => {
    const isPremium = isNFTPremium(pokemon);
    const buyContext = useBuyContext();
    const hp = pokemon.stats.find(stat => stat.stat.name === "hp");

    const ref = useNotifyImpression<HTMLDivElement>({
      isPremium,
      nftID: String(pokemon.id),
    });

    const { isHovered, onLeave, onEnter } = useIsHoveredValue();
    const [isFocused, setIsFocused] = React.useState(false);
    return (
      <Card
        color={getColor({ isFocused, isHovered, isPremium })}
        {...otherProps}
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        raised={isFocused}
        style={{ outline: 0 }}
      >
        <CardHeader title={pokemon.name} />
        <CardContent>
          {pokemon.sprites.front_default && (
            <CardMedia
              component="img"
              src={pokemon.sprites.front_default}
              className="ui image floated right"
              alt={pokemon.name}
            />
          )}
          {pokemon.types.map(type => type.type.name).join(", ")}
          {isPremium && <Chip label="Premium" />}
          {buyContext.owns(`pokemon-${pokemon.id}`) && (
            <Chip style={{ marginTop: 60 }} label="Owned" />
          )}
        </CardContent>
        <CardActions>
          {hp && (
            <>
              <FavoriteIcon />
              {hp.base_stat}
            </>
          )}
          <Link to={`/detail/${pokemon.id}`}>
            <Button size="small">More</Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
);
NFTCard.displayName = "NFTCard";

export default NFTCard;
