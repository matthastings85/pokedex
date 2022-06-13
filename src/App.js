import React, { useState } from "react";

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import PokemonInfo from "./Components/PokemonInfo";
import Pokedex from "./Components/Pokedex";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/:pokemonId" element={<PokemonInfo />} />
    </Routes>
  </Router>
);

export default App;
