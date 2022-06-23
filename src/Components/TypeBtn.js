import React from "react";
import { Link } from "react-router-dom";

const TypeBtn = ({ typeName, weakness, small }) => {
  if (small) {
    return (
      <>
        <button className={`${typeName} type-btn type-btn-small`}>
          {typeName}
        </button>
      </>
    );
  }

  return (
    <>
      {weakness ? (
        <Link to={`/type/${typeName}`}>
          <button className={`${typeName} type-btn type-btn-small`}>
            {typeName}
          </button>
        </Link>
      ) : (
        <Link to={`/type/${typeName}`}>
          <button className={`${typeName} type-btn`}>{typeName}</button>
        </Link>
      )}
    </>
  );
};

export default TypeBtn;
