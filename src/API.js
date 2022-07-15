const apiFunctions = {
  POKEURL: "https://pokeapi.co/api/v2/pokemon/",
  TYPESURL: "https://pokeapi.co/api/v2/type/",
  ABILITYURL: "https://pokeapi.co/api/v2/ability/",
  fetchNextPokemon: async (url = this.POKEURL) => {
    return await (await fetch(url)).json();
  },
  fetchPokemon: async (url = this.POKEURL) => {
    return await (await fetch(url)).json();
  },
  fetchSpecies: async (url) => {
    return await (await fetch(url)).json();
  },
  fetchTypes: async (type, url = this.TYPESURL) => {
    return await (await fetch(url + type)).json();
  },
  fetchAbility: async (url = this.ABILITYURL) => {
    return await (await fetch(url)).json();
  },
};

export default apiFunctions;
