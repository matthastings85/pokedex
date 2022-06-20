import React from "react";

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
