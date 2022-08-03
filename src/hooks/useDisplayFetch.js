import { useCallback, useEffect, useState } from "react";

// API
import API from "../API";

// Utilities
import { checkArray } from "../utilities";

// Hooks
import { useFetchAllPokemon } from "./useFetchAllPokemon";

export const useDisplayFetch = (pokemonData, setPokemonData) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [reset, setReset] = useState(false);
  const [isSearchDisplay, setIsSearchDisplay] = useState(false);
  const [remainingSearch, setRemainingSearch] = useState([]);

  const { allPokemon } = useFetchAllPokemon();

  const fetchPokemon = useCallback(async (targetArray) => {
    try {
      setError(false);
      setLoading(true);

      const display = targetArray.slice(0, 20);
      const remaining = targetArray.slice(20);

      setRemainingSearch(remaining);

      const newArray = [];

      // Get data from API or pokemonData
      const array = display.map(async (name) => {
        const exists = checkArray(name.toLowerCase(), pokemonData);

        if (exists) {
          const alreadyExists = pokemonData.filter(
            (pokemon) => name.toLowerCase() === pokemon.name
          );
          console.log("grabbing from pokemonData");
          return alreadyExists[0];
        } else {
          console.log("grabbing from API");
          const data = await API.fetchPokemon(API.POKEURL + name.toLowerCase());
          const pokemonName = data.name;
          const pokemonId = data.id;
          const types = data.types;
          const pokemonObj = { name: pokemonName, pokemonId, data, types };
          newArray.push(pokemonObj);
          return pokemonObj;
        }
      });
      const pokeArray = await Promise.all(array);

      // Storing Data in global state

      setPokemonData((current) => [...current, ...newArray]);

      if (isLoadingMore) {
        setState((current) => [...current, ...pokeArray]);
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

    fetchPokemon(remainingSearch);
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
