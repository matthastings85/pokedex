export const POKEURL = "https://pokeapi.co/api/v2/pokemon/";

export const useFetch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
