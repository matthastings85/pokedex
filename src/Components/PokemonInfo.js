import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import { useFetchPokemon } from "../hooks/useFetchPokemon";

// Components
import Spinner from "./Spinner";
import Stats from "./Stats";
import TypeBtn from "./TypeBtn";
import EvoChain from "./EvoChain";

const PokemonInfo = () => {
  const { pokemonName } = useParams();

  const { state, loading, error } = useFetchPokemon(pokemonName);

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
          <div className="info-wrapper">
            <div className="poke-info">
              <h4>Height:</h4>
              <div>{state.height}</div>
              <h4>Weight:</h4>
              <div>{state.weight}</div>
            </div>
            <div className="poke-info">
              <h4>Abilities</h4>
              {state.abilitiesArray !== undefined &&
                state.abilitiesArray.map((ability) => {
                  return (
                    <div key={ability.abilityName}>{ability.abilityName}</div>
                  );
                })}
            </div>
          </div>
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
