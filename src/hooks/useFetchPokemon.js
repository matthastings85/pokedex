import { useState, useEffect, useCallback } from "react";

import API from "../API";
import {
  capitalizeName,
  getWeaknesses,
  checkSaveEvoChain,
  getEvoDisplayData,
  checkArray,
  checkArrayById,
} from "../utilities";

export const useFetchPokemon = (name, pokemonData, setPokemonData) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [prev, setPrev] = useState({});
  const [next, setNext] = useState({});
  const [currentId, setCurrentId] = useState();

  const getPrevNextPokemon = useCallback(
    async (currentId) => {
      if (!currentId) return;
      try {
        const prevId = currentId - 1;
        const nextId = currentId + 1;

        const prevExists = checkArrayById(prevId, pokemonData);
        const nextExists = checkArrayById(nextId, pokemonData);
        console.log(prevExists, nextExists);
        if (prevExists) {
          console.log("Grabbing from pokemonData");
          const prevPokemon = pokemonData.filter((pokemon) => {
            return pokemon.pokemonId === prevId;
          });
          setPrev(prevPokemon[0]);
        } else if (prevId > 0) {
          console.log("Grabbing from API", prevId);
          const pokemon = await API.fetchPokemon(API.POKEURL + prevId);

          // Save pokemon to pokemonData
          const pokemonName = pokemon.name;
          const pokemonId = pokemon.id;
          const types = pokemon.types;
          const pokemonObj = {
            name: pokemonName,
            pokemonId,
            data: pokemon,
            types,
          };
          setPrev(pokemonObj);
          setPokemonData([...pokemonData, pokemonObj]);
        }

        if (nextExists) {
          console.log("Grabbing from pokemonData");
          const nextPokemon = pokemonData.filter((pokemon) => {
            return pokemon.pokemonId === nextId;
          });
          setNext(nextPokemon[0]);
        } else {
          console.log("Grabbing from API", nextId);
          const pokemon = await API.fetchPokemon(API.POKEURL + nextId);

          // Save pokemon to pokemonData
          const pokemonName = pokemon.name;
          const pokemonId = pokemon.id;
          const types = pokemon.types;
          const pokemonObj = {
            name: pokemonName,
            pokemonId,
            data: pokemon,
            types,
          };
          setNext(pokemonObj);
          setPokemonData([...pokemonData, pokemonObj]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [currentId, pokemonData, setPokemonData]
  );

  const fetchPokemon = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);

      let pokemon;

      const exists = checkArray(name, pokemonData);
      if (exists) {
        console.log("Grabbing from pokemonData", name);
        const targetPokemon = pokemonData.filter(
          (pokemon) => pokemon.name === name
        );
        pokemon = targetPokemon[0].data;
      } else {
        console.log("Grabbing from API", name);
        pokemon = await API.fetchPokemon(API.POKEURL + name);

        // Save pokemon to pokemonData
        const pokemonName = pokemon.name;
        const pokemonId = pokemon.id;
        const types = pokemon.types;
        const pokemonObj = {
          name: pokemonName,
          pokemonId,
          data: pokemon,
          types,
        };
        setPokemonData([...pokemonData, pokemonObj]);
      }

      // Isolate basic info
      const pokemonId = pokemon.id;
      const pokemonName = pokemon.name;
      const imgUrl = pokemon.sprites.other["official-artwork"].front_default;
      const height = pokemon.height;
      const weight = pokemon.weight;

      // Set currentId to get prev and next pokemon
      setCurrentId(pokemonId);

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
      const prepAbilitiesArray = abilities.map(async (element) => {
        const abilityName = element.ability.name;
        const abilityUrl = element.ability.url;

        const data = await API.fetchAbility(abilityUrl);

        const abilityEntires = data.effect_entries;

        let abilityInfo;
        for (let entry of abilityEntires) {
          if (entry.language.name === "en") {
            abilityInfo = entry.short_effect;
          }
        }
        return { abilityName, abilityUrl, abilityInfo };
      });

      const abilitiesArray = await Promise.all(prepAbilitiesArray);

      // Isolate Evo-tree data
      const speciesUrl = pokemon.species.url;
      const speciesData = await API.fetchSpecies(speciesUrl);
      const evoChain = await API.fetchSpecies(speciesData.evolution_chain.url);
      const evoChainNames = checkSaveEvoChain(evoChain);
      let evoDisplay;

      evoChainNames.length > 1
        ? (evoDisplay = await getEvoDisplayData(
            evoChainNames,
            pokemonData,
            setPokemonData
          ))
        : (evoDisplay = null);

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
      console.log(error);
      setError(true);
    }
    setLoading(false);
  }, [name, pokemonData, setPokemonData]);

  // Initial render, trigger function
  useEffect(() => {
    fetchPokemon();
  }, [name]);

  useEffect(() => {
    getPrevNextPokemon(currentId);
  }, [currentId]);

  return { state, loading, error, prev, next };
};
