import React, { useEffect, useState } from "react";

//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import PokemonInfo from "./Components/PokemonInfo";
import Pokedex from "./Components/Pokedex";
import Header from "./Components/Header";
import PokemonType from "./Components/PokemonType";
import Footer from "./Components/Footer";
import Breadcrumbs from "./Components/Breadcrumbs";
import AllTypes from "./Components/AllTypes";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    console.log(pokemonData);
  }, [pokemonData]);

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
          path="/pokemon/:name"
          element={
            <>
              <Breadcrumbs path="Pokémon" />
              <PokemonInfo
                pokemonData={pokemonData}
                setPokemonData={setPokemonData}
              />
            </>
          }
        />
        <Route
          path="/type/:pokemonType"
          element={
            <>
              <Breadcrumbs path="Types" />
              <PokemonType
                pokemonData={pokemonData}
                setPokemonData={setPokemonData}
              />
            </>
          }
        />
        <Route
          path="/types"
          element={
            <>
              <Breadcrumbs path="Types" />
              <AllTypes />
            </>
          }
        />
        <Route
          path="/pokemon"
          element={
            <>
              <Breadcrumbs path="Pokémon" />
              <Pokedex
                pokemonData={pokemonData}
                setPokemonData={setPokemonData}
              />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
