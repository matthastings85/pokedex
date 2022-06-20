import React from "react";
import { Link } from "react-router-dom";

import { capitalizeName } from "../utilities";
import TypeBtn from "./TypeBtn";

const Card = ({ pokemon }) => {
  const name = capitalizeName(pokemon.name);
  const id = pokemon.pokemonId;
  const url = pokemon.data.sprites.other["official-artwork"].front_default;
  const types = pokemon.types;

  return (
    <li className="card" id={id}>
      <Link to={`/${pokemon.name.toLowerCase()}`}>
        <img className="card-img" src={url} alt={name} />
        {types.map((slot, index) => {
          return <TypeBtn key={index} typeName={slot.type.name} small />;
        })}
        <h3>
          #{id} {name}
        </h3>
      </Link>
    </li>
  );
};

export default Card;
