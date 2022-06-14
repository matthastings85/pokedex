import { useEffect, useState } from "react";

// API
import API from "../API";

export const useDisplayFetch = () => {
  const [state, setState] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchPokemon = async (url = nextUrl) => {
    try {
      setError(false);
      setLoading(true);

      const data = await API.fetchNextPokemon(url);

      const array = data.results.map(async (pokemon) => {
        const name = pokemon.name;
        const data = await API.fetchPokemon(name, API.POKEURL);
        const pokemonId = data.id;
        return { name, pokemonId, data };
      });

      const pokeArray = await Promise.all(array);

      setState([...state, ...pokeArray]);
      setNextUrl(data.next);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render
  useEffect(() => {
    console.log("Grabbing from API");
    // setState(initialState);
    fetchPokemon(API.POKEURL);
  }, []);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchPokemon();
    setIsLoadingMore(false);
  }, [isLoadingMore]);

  return { state, loading, error, setIsLoadingMore };
};
