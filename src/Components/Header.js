import React from "react";
import { Link } from "react-router-dom";

import pokemonLogo from "../images/Pokemon.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-div">
        <Link to={"/"}>
          <img className="header-logo" src={pokemonLogo} alt="pokemon logo" />
        </Link>
      </div>
      <h1 className="header-title">Pokédex</h1>
      <div className="header-credits">
        <div>Powered by</div>
        <a href="https://pokeapi.co/">PokéAPI</a>
      </div>
    </header>
  );
};

export default Header;
