import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import { useFetchPokemon } from "../hooks/useFetchPokemon";

// Components
import Spinner from "./Spinner";
import Stats from "./Stats";
import TypeBtn from "./TypeBtn";
import EvoChain from "./EvoChain";
import Info from "./Info";

const PokemonInfo = ({ pokemonData, setPokemonData }) => {
  const { pokemonName } = useParams();

  const { state, loading, error } = useFetchPokemon(
    pokemonName,
    pokemonData,
    setPokemonData
  );

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <div className="poke-info-wrapper pokedex-wrapper">
      <h2>{`${state.name} - #${state.id}`}</h2>

      <div className="inner-container">
        <div className="inner-wrapper">
          <div className="type-container">
            <h3>Types</h3>
            {state.typesArray !== undefined &&
              state.typesArray.map((type) => {
                return <TypeBtn key={type.typeName} typeName={type.typeName} />;
              })}
            <h3>Weaknesses</h3>
            {state.weaknessesArray !== undefined &&
              state.weaknessesArray.map((weakness) => {
                return <TypeBtn weakness key={weakness} typeName={weakness} />;
              })}
          </div>
          <div className="img-container">
            <img
              className="poke-info-img"
              src={state.imgUrl}
              alt={state.name}
            />
          </div>
          <Info
            weight={state.weight}
            height={state.height}
            abilitiesArray={state.abilitiesArray}
          />
        </div>
        {state.statsArray !== undefined && <Stats stats={state.statsArray} />}
        {state.evoDisplay !== undefined && (
          <EvoChain evoChain={state.evoDisplay} />
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;
