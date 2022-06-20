import React from "react";
import { Link } from "react-router-dom";

import pokemonLogo from "../images/Pokemon.png";

const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        <img className="header-logo" src={pokemonLogo} alt="pokemon logo" />
      </Link>
      <h1>Pokédex</h1>
    </header>
  );
};

export default Header;
