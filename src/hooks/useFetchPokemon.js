import React, { useState, useEffect } from "react";

import API from "../API";

export const useFetchPokemon = (name) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPokemon = async () => {
    try {
      setError(false);
      setLoading(true);

      const pokemon = await API.fetchPokemon(name, API.POKEURL);

      setState(pokemon);
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
