import React from "react";
import { useParams } from "react-router-dom";
import useTypeFetch from "../hooks/useTypeFetch";
import { capitalizeName } from "../utilities";

// Components
import Spinner from "./Spinner";
import Card from "./Card";

const PokemonType = () => {
  const { pokemonType } = useParams();

  const { loading, error, state } = useTypeFetch(pokemonType);

  return (
    <div className="pokedex-wrapper">
      <h2>Type: {capitalizeName(pokemonType)}</h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="pokedex-grid">
          {state.map((pokemon) => {
            const name = pokemon.name;
            return <Card pokemon={pokemon} key={name} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default PokemonType;
