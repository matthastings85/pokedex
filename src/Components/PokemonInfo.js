import React from "react";
import { useParams } from "react-router-dom";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { capitalizeName } from "../utilities";

import Spinner from "./Spinner";

const PokemonInfo = () => {
  const { pokemonName } = useParams();

  const { state: pokemon, loading, error } = useFetchPokemon(pokemonName);

  const name = capitalizeName(pokemon.name);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;
  return <div>{name}</div>;
};

export default PokemonInfo;
