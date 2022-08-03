import React from "react";
import { Link, useParams } from "react-router-dom";
import { capitalizeName } from "../utilities";

const Breadcrumbs = ({ path }) => {
  const { name, pokemonType } = useParams();

  const parsePath = (path) => {
    if (path === "Pokémon") return "pokemon";
    return path.toLowerCase();
  };

  return (
    <div className="breadcrumb">
      <Link to="/">
        <span>Home</span>
      </Link>
      <Link to={`/${parsePath(path)}`}>
        <span>|</span>
        <span>{path}</span>
      </Link>
      {pokemonType && (
        <>
          <span>|</span>
          <span>{capitalizeName(pokemonType)}</span>
        </>
      )}
      {name && (
        <>
          <span>|</span>
          <span>{capitalizeName(name)}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
