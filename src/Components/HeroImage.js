import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroImage = () => {
  const [state, setState] = useState([]);
  const spriteUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  const array = [];
  const getRandomNumber = () => {
    const number = Math.floor(Math.random() * 874 + 1);
    if (array.includes(number)) {
      getRandomNumber();
    } else if (array.length >= 9) {
      return;
    } else {
      array.push(number);
    }
  };

  const createImageUrls = () => {
    for (let i = 0; i < 9; i++) {
      getRandomNumber();
    }
    setState(array);
  };

  useEffect(() => {
    createImageUrls();
  }, []);

  return (
    <div className="hero-wrapper">
      {state.map((number, index) => {
        return (
          <div className={"hero-img" + index + " hero-img-div"} key={number}>
            <Link to={`/${number}`}>
              <img
                className="hero-img"
                src={spriteUrl + number + ".png"}
                alt="pokemon image"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HeroImage;
