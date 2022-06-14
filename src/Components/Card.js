import React from "react";
import { Link } from "react-router-dom";

import { capitalizeName } from "../utilities";

const Card = ({ pokemon }) => {
  const name = capitalizeName(pokemon.name);
  const id = pokemon.pokemonId;
  const url = pokemon.data.sprites.other["official-artwork"].front_default;

  return (
    <li className="card" id={id}>
      <Link to={`/${pokemon.name}`}>
        <img className="card-img" src={url} alt={name} />
        <h3>
          #{id} {name}
        </h3>
      </Link>
    </li>
  );
};

export default Card;
