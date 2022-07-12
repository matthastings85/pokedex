import { useEffect, useState } from "react";

// Utilities

// API
import API from "../API";
import { isPersistedState } from "../utilities";

export const useFetchAllPokemon = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState(API.POKEURL);
  const [namesArray, setNamesArray] = useState([]);

  const fetchPokemon = async () => {
    try {
      const data = await API.fetchNextPokemon(nextUrl);
      const results = data.results;

      const pokeArray = [];

      results.forEach((pokemon) => {
        const name = pokemon.name;
        pokeArray.push(name);
      });

      if (data.next) {
        setNamesArray([...namesArray, ...pokeArray]);
        setNextUrl(data.next);
      } else {
        setAllPokemon(namesArray);
      }
    } catch (error) {}
  };

  // Pulls all the pokemon names from the API. Checks sessionStorage for Array first.
  useEffect(() => {
    const sessionState = isPersistedState("allPokemon");

    if (sessionState) {
      console.log("Grabbing allPokemon from sessionStorage");
      setAllPokemon(sessionState);
      return;
    }

    console.log("Grabbing allPokemon from API");
    fetchPokemon();
  }, [nextUrl]);

  // Write to sessionStorage
  useEffect(() => {
    if (nextUrl !== null && allPokemon.length > 0) {
      console.log("Writing allPokemon to sessionStorage");
      sessionStorage.setItem("allPokemon", JSON.stringify(allPokemon));
    }
  }, [allPokemon]);

  return { allPokemon };
};
