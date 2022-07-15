import { useEffect, useState } from "react";

const useGetNumbers = () => {
  const [numbers, setNumbers] = useState([]);

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
    setNumbers(array);
  };

  useEffect(() => {
    createImageUrls();
  }, []);

  return numbers;
};

export default useGetNumbers;
