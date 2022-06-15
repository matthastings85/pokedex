import React from "react";

const TypeBtn = ({ typeName }) => {
  return <button className={`${typeName} type-btn`}>{typeName}</button>;
};

export default TypeBtn;
