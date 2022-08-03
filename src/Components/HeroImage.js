import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../API";
import useGetNumbers from "../hooks/useGetNumbers";
import noImage from "../images/no_image.jpg";
import { checkArrayById } from "../utilities";

const HeroImage = ({ pokemonData, setPokemonData }) => {
  const [state, setState] = useState([]);
  const numbers = useGetNumbers();

  const getPokemonData = useCallback(
    async (numbers) => {
      const newArray = [];
      const gettingData = numbers.map(async (number) => {
        const exists = checkArrayById(number, pokemonData);
        if (exists) {
          const targetPokemon = pokemonData.filter(
            (pokemon) => pokemon.pokemonId === number
          );
          return targetPokemon[0];
        } else {
          const data = await API.fetchPokemon(API.POKEURL + number);
          const name = data.name;
          const pokemonId = data.id;
          const types = data.types;
          const pokemonObj = { name, pokemonId, data, types };
          newArray.push(pokemonObj);
          return pokemonObj;
        }
      });
      const pokemonArray = await Promise.all(gettingData);

      setPokemonData((current) => [...current, ...newArray]);

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
            <Link to={`/pokemon/${pokemon.name}`}>
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
