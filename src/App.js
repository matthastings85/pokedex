import React, { useState } from "react";

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import PokemonInfo from "./Components/PokemonInfo";
import Pokedex from "./Components/Pokedex";
import Header from "./Components/Header";
import PokemonType from "./Components/PokemonType";
import Footer from "./Components/Footer";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/:pokemonName" element={<PokemonInfo />} />
      <Route path="/type/:pokemonType" element={<PokemonType />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
