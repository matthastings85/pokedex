import { useEffect, useState } from "react";

// API
import API from "../API";

export const useDisplayFetch = () => {
  const [state, setState] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [reset, setReset] = useState(false);

  const fetchPokemon = async (url = nextUrl) => {
    try {
      setError(false);
      setLoading(true);

      const data = await API.fetchNextPokemon(url);

      const array = data.results.map(async (pokemon) => {
        const name = pokemon.name;
        const data = await API.fetchPokemon(name, API.POKEURL);
        const types = data.types;
        const pokemonId = data.id;
        return { name, pokemonId, types, data };
      });

      const pokeArray = await Promise.all(array);
      if (reset) {
        console.log("RESET");
        setState(pokeArray);
        setReset(false);
      } else {
        setState([...state, ...pokeArray]);
      }
      setNextUrl(data.next);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render
  useEffect(() => {
    console.log("Initial load: Grabbing from API");

    fetchPokemon(API.POKEURL);
  }, []);

  const searchPokemon = async (searchArray) => {
    try {
      setError(false);
      setLoading(true);

      const array = searchArray.map(async (name) => {
        const data = await API.fetchPokemon(name.toLowerCase(), API.POKEURL);
        const pokemonId = data.id;
        const types = data.types;
        return { name, pokemonId, data, types };
      });
      const pokeArray = await Promise.all(array);
      setState(pokeArray);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const resetDisplay = async () => {
    setLoading(true);
    setIsSearching(false);
    setSearchArray([]);
    fetchPokemon(API.POKEURL);
  };

  useEffect(() => {
    if (isSearching) {
      searchPokemon(searchArray);
      setIsSearching(false);
    }
    if (!isLoadingMore) return;
    console.log("Grabbing more from API");

    fetchPokemon();
    setIsLoadingMore(false);
  }, [isLoadingMore, isSearching]);

  useEffect(() => {
    if (!reset) return;
    console.log("Reset: Grabbing from API");
    resetDisplay();
  }, [reset]);

  return {
    state,
    loading,
    error,
    reset,
    setLoading,
    setIsLoadingMore,
    setIsSearching,
    setSearchArray,
    setReset,
  };
};
