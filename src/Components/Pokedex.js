import React, { useState, useEffect } from "react";

// Components
import Search from "./Search";
import Spinner from "./Spinner";
import HeroImage from "./HeroImage";

// Hooks
import { useDisplayFetch } from "../hooks/useDisplayFetch";

// Utilities
import { handleSearch } from "../utilities";
import Grid from "./Grid";
import Button from "./Button";

const Pokedex = ({ pokemonData, setPokemonData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  const {
    state,
    loading,
    error,
    reset,
    remainingSearch,
    isSearchDisplay,
    setLoading,
    setIsLoadingMore,
    setIsSearching,
    setSearchArray,
    setReset,
    setIsSearchDisplay,
    allPokemon,
  } = useDisplayFetch(pokemonData, setPokemonData);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    if (searchTerm === "") {
      setIsSearching(false);
      setIsSearchDisplay(false);
      setReset(true);
      return;
    }
    setLoading(true);
    const results = handleSearch(searchTerm, allPokemon);

    setSearchArray(results);
    setIsSearching(true);
  }, [searchTerm]);

  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <HeroImage />
      <Search setSearchTerm={setSearchTerm} />
      <div className="pokedex-wrapper">
        {!reset || state !== [] ? <Grid state={state} /> : <Spinner />}
        {loading && <Spinner />}
        {remainingSearch.length !== 0 && isSearchDisplay && (
          <Button text="Load More" callback={setIsLoadingMore} />
        )}
        {!isSearchDisplay && !loading && (
          <Button text="Load More" callback={setIsLoadingMore} />
        )}
      </div>
    </>
  );
};

export default Pokedex;
