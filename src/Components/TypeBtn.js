import React from "react";

const TypeBtn = ({ typeName, weakness }) => {
  return (
    <>
      {weakness ? (
        <button className={`${typeName} type-btn type-btn-small`}>
          {typeName}
        </button>
      ) : (
        <button className={`${typeName} type-btn`}>{typeName}</button>
      )}
    </>
  );
};

export default TypeBtn;
