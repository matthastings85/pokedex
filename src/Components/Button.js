import React from "react";

const Button = ({ text, callback }) => {
  return (
    <button
      onClick={() => {
        callback(true);
      }}
      className="button"
    >
      {text}
    </button>
  );
};

export default Button;
