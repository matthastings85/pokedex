import { useCallback, useEffect, useState } from "react";

// API
import API from "../API";

// Utilities
import { checkArray } from "../utilities";

// Hooks
import { useFetchAllPokemon } from "./useFetchAllPokemon";

export const useDisplayFetch = (pokemonData, setPokemonData) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [reset, setReset] = useState(false);
  const [isSearchDisplay, setIsSearchDisplay] = useState(false);
  const [remainingSearch, setRemainingSearch] = useState([]);

  const { allPokemon } = useFetchAllPokemon();

  const fetchPokemon = useCallback(async (searchArray) => {
    try {
      setError(false);
      setLoading(true);

      const display = searchArray.slice(0, 20);
      const remaining = searchArray.slice(20);

      setRemainingSearch(remaining);

      // Get data from API or pokemonData
      const array = display.map(async (name) => {
        const alreadyExists = pokemonData.filter(
          (pokemon) => name === pokemon.name
        );

        if (alreadyExists.length > 0) {
          console.log("grabbing from pokemonData");
          return alreadyExists[0];
        } else {
          console.log("grabbing from ApI");
          const data = await API.fetchPokemon(name.toLowerCase(), API.POKEURL);
          const pokemonId = data.id;
          const types = data.types;
          const pokemonObj = { name, pokemonId, data, types };
          return pokemonObj;
        }
      });
      const pokeArray = await Promise.all(array);

      // Checking if data already exists, then saving it to global state
      const newArray = pokemonData.slice();
      pokeArray.forEach((pokemon) => {
        const exists = checkArray(pokemon.name, newArray);
        if (!exists) {
          newArray.push(pokemon);
        }
      });
      // Storing Data in global state
      setPokemonData(newArray);

      if (isLoadingMore) {
        setState([...state, ...pokeArray]);
        setIsLoadingMore(false);
      } else {
        setState(pokeArray);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  });

  // Initial render
  useEffect(() => {
    if (allPokemon.length > 0) {
      console.log("Initial load");
      fetchPokemon(allPokemon);
    }
  }, [allPokemon]);

  const resetDisplay = async () => {
    setLoading(true);
    setIsSearching(false);
    setSearchArray([]);

    console.log("RESET Display");
    fetchPokemon(allPokemon);
  };

  // Load More & Search
  useEffect(() => {
    if (isLoadingMore && isSearchDisplay) {
      fetchPokemon(remainingSearch);
    }
    if (isSearching) {
      setIsSearchDisplay(true);
      setState([]);
      fetchPokemon(searchArray);
      setIsSearching(false);
    }
    if (!isLoadingMore || isSearchDisplay) return;

    console.log("Loading More");
    fetchPokemon(remainingSearch);
    setIsLoadingMore(false);
  }, [isLoadingMore, isSearching]);

  // Reset the display after removing search term
  useEffect(() => {
    if (!reset) return;
    console.log("Reseting");
    resetDisplay();
  }, [reset]);

  return {
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
  };
};
