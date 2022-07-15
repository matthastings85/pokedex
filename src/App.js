import React, { useState } from "react";

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import PokemonInfo from "./Components/PokemonInfo";
import Pokedex from "./Components/Pokedex";
import Header from "./Components/Header";
import PokemonType from "./Components/PokemonType";
import Footer from "./Components/Footer";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Pokedex
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
            />
          }
        />
        <Route
          path="/:name"
          element={
            <PokemonInfo
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
            />
          }
        />
        <Route
          path="/type/:pokemonType"
          element={
            <PokemonType
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
