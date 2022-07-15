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
    const data = await API.fetchPokemon(API.POKEURL + name);
    const pokemonName = capitalizeName(data.name);
    const pokemonId = data.id;
    const imgUrl = data.sprites.other["official-artwork"].front_default;
    return { pokemonId, pokemonName, imgUrl };
  });
  const evoArray = await Promise.all(fetchingData);

  return evoArray;
};

export const handleSearch = (searchTerm, allPokemon) => {
  if (searchTerm === "") return "";
  const results = allPokemon.filter((name) => {
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ? name : null;
  });

  return results.map((result) => capitalizeName(result));
};

export const isPersistedState = (stateName) => {
  const sessionState = sessionStorage.getItem(stateName);
  return sessionStorage && JSON.parse(sessionState);
};

export const checkArray = (name, array) => {
  const alreadyExists = array.filter((pokemon) => pokemon.name === name);
  if (alreadyExists.length !== 0) {
    return true;
  } else {
    return false;
  }
};
