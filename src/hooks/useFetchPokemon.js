import { useState, useEffect } from "react";

import API from "../API";
import {
  capitalizeName,
  getWeaknesses,
  checkSaveEvoChain,
  getEvoDisplayData,
} from "../utilities";

export const useFetchPokemon = (name) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPokemon = async (name) => {
    try {
      setError(false);
      setLoading(true);

      const pokemon = await API.fetchPokemon(name, API.POKEURL);

      // Isolate basic info
      const pokemonId = pokemon.id;
      const pokemonName = pokemon.name;
      const imgUrl = pokemon.sprites.other["official-artwork"].front_default;
      const height = pokemon.height;
      const weight = pokemon.weight;

      // Isolate weaknesses, populated by function call in types map function
      let weaknessesArray = [];

      // Isolate Types
      const types = pokemon.types;
      const typesPrep = types.map(async (element) => {
        const typeName = element.type.name;
        const typeUrl = element.type.url;

        const weaknesses = await getWeaknesses(API.TYPESURL, typeName);
        for (let weakness of weaknesses) {
          if (!weaknessesArray.includes(weakness))
            weaknessesArray.push(weakness);
        }

        return { typeName, typeUrl };
      });
      const typesArray = await Promise.all(typesPrep);

      // Isolate Stats
      const stats = pokemon.stats;
      const statsArray = stats.map((element) => {
        const statName = element.stat.name;
        const statUrl = element.stat.url;
        const base = element.base_stat;
        return { statName, statUrl, base };
      });

      // Isolate abilities
      const abilities = pokemon.abilities;
      const abilitiesArray = abilities.map((element) => {
        const abilityName = element.ability.name;
        const abilityUrl = element.ability.url;
        return { abilityName, abilityUrl };
      });

      // Isolate Evo-tree data
      const speciesUrl = pokemon.species.url;
      const speciesData = await API.fetchSpecies(speciesUrl);
      const evoChain = await API.fetchSpecies(speciesData.evolution_chain.url);
      const evoChainNames = await checkSaveEvoChain(evoChain);
      const evoDisplay = await getEvoDisplayData(evoChainNames);

      // Save pokemon data to state
      setState({
        id: pokemonId,
        name: capitalizeName(pokemonName),
        imgUrl,
        height,
        weight,
        typesArray,
        statsArray,
        abilitiesArray,
        weaknessesArray,
        evoDisplay,
        data: pokemon,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render, trigger function
  useEffect(() => {
    console.log("Grabbing from API");
    fetchPokemon(name);
  }, [name]);

  return { state, loading, error };
};
