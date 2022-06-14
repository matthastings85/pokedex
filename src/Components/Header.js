import React from "react";

import pokemonLogo from "../images/Pokemon.png";

const Header = () => {
  return (
    <header>
      <img className="header-logo" src={pokemonLogo} alt="pokemon logo" />
      <h1>Pokédex</h1>
    </header>
  );
};

export default Header;
