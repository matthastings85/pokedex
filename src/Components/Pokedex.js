import React, { useState, useEffect } from "react";

// Components
import Search from "./Search";
import Card from "./Card";

// Hooks
import { useFetchAllPokemon } from "../hooks/useFetchAllPokemon";
import { useDisplayFetch } from "../hooks/useDisplayFetch";
import Spinner from "./Spinner";

const Pokedex = () => {
  const { state, loading, error, setIsLoadingMore } = useDisplayFetch();

  const { allPokemon } = useFetchAllPokemon();

  useEffect(() => {
    // console.log(allPokemon);
    console.log(state);
  }, [allPokemon, state]);

  return (
    <div className="pokedex-wrapper">
      <Search />
      <ul className="pokedex-grid">
        {state.map((pokemon) => {
          const name = pokemon.name;
          return <Card pokemon={pokemon} key={name} />;
        })}
      </ul>
      {loading ? (
        <Spinner />
      ) : (
        <button
          className="button"
          onClick={() => {
            setIsLoadingMore(true);
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Pokedex;
