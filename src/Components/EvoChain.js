import React from "react";

const EvoChain = ({ evoChain }) => {
  console.log(evoChain);
  return (
    <div className="evo-wrapper">
      <h2>Evolution</h2>
      <div className="evo-inner">
        {evoChain.map((pokemon) => {
          return (
            <div key={pokemon.pokemonId} className="evo-card">
              <img src={pokemon.imgUrl} alt={pokemon.pokemonName} />
              <h4>{pokemon.pokemonName}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvoChain;