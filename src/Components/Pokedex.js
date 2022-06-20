import React, { useState, useEffect } from "react";

// Components
import Search from "./Search";
import Card from "./Card";

// Hooks
import { useFetchAllPokemon } from "../hooks/useFetchAllPokemon";
import { useDisplayFetch } from "../hooks/useDisplayFetch";
import Spinner from "./Spinner";

// Utilities
import { capitalizeName, handleSearch } from "../utilities";
import { useParams } from "react-router-dom";

const Pokedex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const { allPokemon } = useFetchAllPokemon();
  const {
    state,
    loading,
    error,
    reset,
    setLoading,
    setIsLoadingMore,
    setIsSearching,
    setSearchArray,
    setReset,
  } = useDisplayFetch();

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    if (searchTerm === "") {
      setIsSearching(false);
      setReset(true);
      return;
    }
    setLoading(true);
    const results = handleSearch(searchTerm, allPokemon);

    setSearchArray(results.slice(0, 20));
    setIsSearching(true);
  }, [searchTerm]);

  if (error) return <div>Something went wrong...</div>;

  return (
    <div className="pokedex-wrapper">
      <Search setSearchTerm={setSearchTerm} />
      {!reset && (
        <ul className="pokedex-grid">
          {state.map((pokemon) => {
            const name = pokemon.name;
            return <Card pokemon={pokemon} key={name} />;
          })}
        </ul>
      )}
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
