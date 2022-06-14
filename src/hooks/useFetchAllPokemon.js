import { useEffect, useState } from "react";

// Utilities

// API
import API from "../API";

export const useFetchAllPokemon = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState(undefined);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await API.fetchNextPokemon(nextUrl);
        const results = data.results;

        const pokeArray = [];

        results.forEach((pokemon) => {
          const name = pokemon.name;
          pokeArray.push(name);
        });

        setAllPokemon([...allPokemon, ...pokeArray]);
        setNextUrl(data.next);
      } catch (error) {}
    };
    fetchPokemon();
  }, [nextUrl]);

  return { allPokemon };
};
