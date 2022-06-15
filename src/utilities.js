import API from "./API";

export const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getWeaknesses = async (url, name) => {
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

export const checkSaveEvoChain = (evoChain) => {
  const array = [];
  if (evoChain.chain.species.name) {
    array.push(evoChain.chain.species.name);
  }
  if (evoChain.chain.evolves_to.length > 0) {
    if (evoChain.chain.evolves_to[0].species.name) {
      array.push(evoChain.chain.evolves_to[0].species.name);
    }
  } else {
    return array;
  }
  if (evoChain.chain.evolves_to[0].evolves_to.length > 0) {
    if (evoChain.chain.evolves_to[0].evolves_to[0].species.name) {
      array.push(evoChain.chain.evolves_to[0].evolves_to[0].species.name);
    }
  } else {
    return array;
  }
  return array;
};

export const getEvoDisplayData = async (evoChainNames) => {
  const fetchingData = evoChainNames.map(async (name) => {
    const data = await API.fetchPokemon(name, API.POKEURL);
    const pokemonName = data.name;
    const pokemonId = data.id;
    const imgUrl = data.sprites.other["official-artwork"].front_default;
    return { pokemonId, pokemonName, imgUrl };
  });
  const evoArray = await Promise.all(fetchingData);

  return evoArray;
};
