import React, { useState, useRef, useEffect } from "react";

// Icon
import searchIcon from "../images/search-icon.svg";

const Search = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <div className="search-wrapper">
      <div className="search-content">
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Pokémon by name"
          onChange={(e) => setState(e.currentTarget.value)}
          value={state}
        />
      </div>
    </div>
  );
};

export default Search;
