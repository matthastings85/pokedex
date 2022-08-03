import React from "react";
import { Link } from "react-router-dom";

import noImage from "../images/no_image.jpg";

const EvoChain = ({ evoChain }) => {
  return (
    <div className="evo-wrapper">
      <h2>Evolution</h2>
      <div className="evo-inner">
        {evoChain.map((pokemon) => {
          return (
            <div key={pokemon.pokemonId} className="evo-card">
              <Link to={`/pokemon/${pokemon.pokemonName.toLowerCase()}`}>
                <img
                  src={pokemon.imgUrl ? pokemon.imgUrl : noImage}
                  alt={pokemon.pokemonName}
                />
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
