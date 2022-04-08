import React from "react";
import { useParams } from "react-router-dom";
import { NFT } from "pokedex-promise-v2";
import { Button, Icon, Segment, Statistic } from "semantic-ui-react";

import { BuyForm } from "../buy/BuyForm";
import { useNFTQuery } from "./api-hooks";
import { NFTForTypeList } from "./NFTForTypeList";

export function NFTDetail() {
  const params = useParams();
  const pokemonId = Number(params.pokemonId);
  const pokemonQuery = useNFTQuery(pokemonId);

  if (pokemonQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (pokemonQuery.isError || !pokemonQuery.data) {
    return <div>Error!</div>;
  }

  const pokemon = pokemonQuery.data;
  const image = pokemon.sprites.front_default;
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <BuyForm pokemon={pokemon} />
      <Segment.Group>
        <Segment>
          {image && <img src={image} alt={pokemon.name} />}
          <Statistic>
            <Statistic.Label>Height</Statistic.Label>
            <Statistic.Value>{pokemon.height}</Statistic.Value>
          </Statistic>
          <Statistic>
            <Statistic.Label>Weight</Statistic.Label>
            <Statistic.Value>{pokemon.weight}</Statistic.Value>
          </Statistic>
          <Statistic>
            <Statistic.Label>Base Experience</Statistic.Label>
            <Statistic.Value>{pokemon.base_experience}</Statistic.Value>
          </Statistic>
          <Statistic.Group>
            <Statistic>
              <Statistic.Label>
                <Icon name="heart" />
              </Statistic.Label>
              <Statistic.Value>
                {pokemon.stats.find(s => s.stat.name === "hp")?.base_stat}
              </Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>
                <Icon name="bolt" />
              </Statistic.Label>
              <Statistic.Value>
                {pokemon.stats.find(s => s.stat.name === "attack")?.base_stat}
              </Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>
                <Icon name="shield" />
              </Statistic.Label>
              <Statistic.Value>
                {pokemon.stats.find(s => s.stat.name === "defense")?.base_stat}
              </Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>
                <Icon name="star" />
              </Statistic.Label>
              <Statistic.Value>
                {
                  pokemon.stats.find(s => s.stat.name === "special-attack")
                    ?.base_stat
                }
              </Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>
                <Icon name="star" />
              </Statistic.Label>
              <Statistic.Value>
                {
                  pokemon.stats.find(s => s.stat.name === "special-defense")
                    ?.base_stat
                }
              </Statistic.Value>
            </Statistic>
            <Statistic>
              <Statistic.Label>
                <Icon name="star" />
              </Statistic.Label>
              <Statistic.Value>
                {pokemon.stats.find(s => s.stat.name === "speed")?.base_stat}
              </Statistic.Value>
            </Statistic>
          </Statistic.Group>
        </Segment>
        <Segment>
          <h3>NFT with similar types</h3>
          <NFTForTypeList typeUrl={pokemon.types[0].type.url} />
        </Segment>
      </Segment.Group>
    </div>
  );
}
