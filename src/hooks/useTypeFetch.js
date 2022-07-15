import { useEffect, useState } from "react";

// API
import API from "../API";
import { checkArray } from "../utilities";

const useTypeFetch = (pokemonType, pokemonData, setPokemonData) => {
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
        const exists = checkArray(name.toLowerCase(), pokemonData);

        if (exists) {
          const alreadyExists = pokemonData.filter(
            (pokemon) => name.toLowerCase() === pokemon.name
          );
          console.log("grabbing from pokemonData");
          return alreadyExists[0];
        } else {
          console.log("grabbing from API");
          const data = await API.fetchPokemon(API.POKEURL + name);
          const types = data.types;
          const pokemonId = data.id;
          return { name, pokemonId, types, data };
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

      setState(pokeArray);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render
  useEffect(() => {
    console.log("Grabbing type list from API");
    fetchTypePokemon(pokemonType);
  }, []);

  return { state, loading, error };
};

export default useTypeFetch;
