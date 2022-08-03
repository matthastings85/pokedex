import React from "react";
import { Link, useParams } from "react-router-dom";

// Hooks
import { useFetchPokemon } from "../hooks/useFetchPokemon";

// Components
import Spinner from "./Spinner";
import Stats from "./Stats";
import TypeBtn from "./TypeBtn";
import EvoChain from "./EvoChain";
import Info from "./Info";

import noImage from "../images/no_image.jpg";
import { capitalizeName } from "../utilities";

const PokemonInfo = ({ pokemonData, setPokemonData }) => {
  const { name } = useParams();

  const { state, loading, error, prev, next } = useFetchPokemon(
    name,
    pokemonData,
    setPokemonData
  );

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;
  return (
    <div className="poke-info-wrapper pokedex-wrapper">
      <div className="next">
        {prev.pokemonId > 0 && prev.name ? (
          <Link to={`/pokemon/${prev.name}`}>
            <span className="next-btn">
              {`< #${prev.pokemonId}`}
              <span className="next-name">{` ${capitalizeName(
                prev.name
              )}`}</span>
            </span>
          </Link>
        ) : (
          <span></span>
        )}
        {next.name && next.pokemonId && (
          <Link to={`/pokemon/${next.name}`}>
            <span className="next-btn">
              <span className="next-name">{`${capitalizeName(
                next.name
              )} `}</span>
              {`#${next.pokemonId} >`}
            </span>
          </Link>
        )}
      </div>
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
              src={state.imgUrl ? state.imgUrl : noImage}
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
        {state.evoDisplay !== undefined && state.evoDisplay !== null ? (
          <EvoChain evoChain={state.evoDisplay} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;
