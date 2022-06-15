import React, { useState, useEffect } from "react";

import API from "../API";
import { capitalizeName } from "../utilities";

export const useFetchPokemon = (name) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPokemon = async () => {
    try {
      setError(false);
      setLoading(true);

      const pokemon = await API.fetchPokemon(name, API.POKEURL);

      const pokemonId = pokemon.id;
      const imgUrl = pokemon.sprites.other["official-artwork"].front_default;
      const height = pokemon.height;
      const weight = pokemon.weight;

      const getWeaknesses = async (url, name) => {
        const weaknesses = [];
        const typeData = await API.fetchTypes(name, url);
        const weaknessArray = typeData.damage_relations.double_damage_from;
        for (let weakness of weaknessArray) {
          if (!weaknesses.includes(weakness.name)) {
            weaknesses.push(weakness.name);
          }
        }
        return weaknesses;
      };

      let weaknessesArray = [];
      const types = pokemon.types;
      const typesPrep = types.map(async (element) => {
        const typeName = element.type.name;
        const typeUrl = element.type.url;

        const weaknesses = await getWeaknesses(API.TYPESURL, typeName);
        weaknessesArray = [...weaknessesArray, ...weaknesses];

        return { typeName, typeUrl };
      });

      const typesArray = await Promise.all(typesPrep);

      const stats = pokemon.stats;
      const statsArray = stats.map((element) => {
        const statName = element.stat.name;
        const statUrl = element.stat.url;
        const base = element.base_stat;
        return { statName, statUrl, base };
      });

      const abilities = pokemon.abilities;
      const abilitiesArray = abilities.map((element) => {
        const abilityName = element.ability.name;
        const abilityUrl = element.ability.url;
        return { abilityName, abilityUrl };
      });

      setState({
        id: pokemonId,
        name: capitalizeName(name),
        imgUrl,
        height,
        weight,
        typesArray,
        statsArray,
        abilitiesArray,
        weaknessesArray,
        data: pokemon,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render
  useEffect(() => {
    console.log("Grabbing from API");
    // setState(initialState);
    fetchPokemon();
  }, []);

  return { state, loading, error };
};
