import React from "react";

// Components
import Card from "./Card";

const Grid = ({ state }) => {
  return (
    <ul className="pokedex-grid">
      {state.map((pokemon) => {
        const name = pokemon.name;
        return <Card pokemon={pokemon} key={name} />;
      })}
    </ul>
  );
};

export default Grid;
