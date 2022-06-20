import React from "react";
import { Link } from "react-router-dom";

const EvoChain = ({ evoChain }) => {
  console.log(evoChain);
  return (
    <div className="evo-wrapper">
      <h2>Evolution</h2>
      <div className="evo-inner">
        {evoChain.map((pokemon) => {
          return (
            <div key={pokemon.pokemonId} className="evo-card">
              <Link to={`/${pokemon.pokemonName}`}>
                <img src={pokemon.imgUrl} alt={pokemon.pokemonName} />
                <h4>{pokemon.pokemonName}</h4>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvoChain;
