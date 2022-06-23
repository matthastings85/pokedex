import { useEffect, useState } from "react";

// API
import API from "../API";

const useTypeFetch = (pokemonType) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTypePokemon = async (type) => {
    try {
      setError(false);
      setLoading(true);

      const data = await API.fetchTypes(type, API.TYPESURL);

      const array = data.pokemon.map(async (pokemon) => {
        const name = pokemon.pokemon.name;

        const data = await API.fetchPokemon(name, API.POKEURL);
        const types = data.types;
        const pokemonId = data.id;
        return { name, pokemonId, types, data };
      });

      const pokeArray = await Promise.all(array);

      setState(pokeArray);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render
  useEffect(() => {
    console.log("Initial load: Grabbing from API");

    fetchTypePokemon(pokemonType);
  }, []);

  return { state, loading, error };
};

export default useTypeFetch;
