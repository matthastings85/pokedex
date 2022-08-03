import React, { useCallback, useEffect, useState } from "react";
import Grid from "./Grid";
import API from "../API";
import TypeBtn from "./TypeBtn";

const AllTypes = () => {
  const [types, setTypes] = useState([]);
  const fetchAllTypes = useCallback(async () => {
    const data = await API.fetchPokemon(API.TYPESURL);
    setTypes(data.results);
  });

  useEffect(() => {
    fetchAllTypes();
  }, []);
  return (
    <div className="pokedex-wrapper">
      <h2>All Pokémon Types</h2>
      <div className="types-flex">
        {types.length > 0 &&
          types.map((type) => {
            return <TypeBtn typeName={type.name} />;
          })}
      </div>
    </div>
  );
};

export default AllTypes;
