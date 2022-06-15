const apiFunctions = {
  POKEURL: "https://pokeapi.co/api/v2/pokemon/",
  TYPESURL: "https://pokeapi.co/api/v2/type/",
  fetchNextPokemon: async (url = this.POKEURL) => {
    return await (await fetch(url)).json();
  },
  fetchPokemon: async (name, url = this.POKEURL) => {
    return await (await fetch(url + name)).json();
  },
  fetchSpecies: async (url) => {
    return await (await fetch(url)).json();
  },
  fetchTypes: async (type, url = this.TYPESURL) => {
    return await (await fetch(url + type)).json();
  },
};

export default apiFunctions;
