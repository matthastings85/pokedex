import React from "react";
import { Link } from "react-router-dom";

import { capitalizeName } from "../utilities";
import TypeBtn from "./TypeBtn";

import noImage from "../images/no_image.jpg";

const Card = ({ pokemon }) => {
  const name = capitalizeName(pokemon.name);
  const id = pokemon.pokemonId;
  const url = pokemon.data.sprites.other["official-artwork"].front_default;
  const types = pokemon.types;

  return (
    <li className="card" id={id}>
      <Link to={`/pokemon/${pokemon.name.toLowerCase()}`}>
        <img className="card-img" src={url ? url : noImage} alt={name} />
        {types.map((slot, index) => {
          return <TypeBtn key={index} typeName={slot.type.name} small />;
        })}
        <h3>{name}</h3>
        <div className="card-num">#{id}</div>
      </Link>
    </li>
  );
};

export default Card;
