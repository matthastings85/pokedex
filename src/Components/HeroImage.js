import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import useGetNumbers from "../hooks/useGetNumbers";
import noImage from "../images/no_image.jpg";

const HeroImage = ({ pokemonData, setPokemonData }) => {
  const [state, setState] = useState([]);
  const numbers = useGetNumbers();

  const getPokemonData = useCallback(
    async (numbers) => {
      const gettingData = numbers.map(async (number) => {
        const data = await API.fetchPokemon(API.POKEURL + number);
        const name = data.name;
        const pokemonId = data.id;
        const types = data.types;
        const pokemonObj = { name, pokemonId, data, types };
        setPokemonData([...pokemonData, pokemonObj]);
        return pokemonObj;
      });

      const pokemonArray = await Promise.all(gettingData);

      setState(pokemonArray);
    },
    [pokemonData, setPokemonData]
  );

  useEffect(() => {
    getPokemonData(numbers);
  }, [numbers]);

  return (
    <div className="hero-wrapper">
      {state.map((pokemon, index) => {
        const url =
          pokemon.data.sprites.other["official-artwork"].front_default;
        return (
          <div
            className={"hero-img" + index + " hero-img-div"}
            key={pokemon.name}
          >
            <Link to={`/${pokemon.name}`}>
              <img
                className="hero-img"
                src={url ? url : noImage}
                alt={pokemon.name}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HeroImage;
