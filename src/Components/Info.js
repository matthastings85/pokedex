import React, { useState } from "react";

const Info = ({ height, weight, abilitiesArray }) => {
  const [modal, setModal] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = (event) => {
    setModal(abilitiesArray[event.target.id]);
    setModalVisible((prev) => !prev);
  };

  return (
    <div className="info-wrapper">
      <div className="poke-info">
        <h4>Height:</h4>
        <div>{height}</div>
        <h4>Weight:</h4>
        <div>{weight}</div>
      </div>
      <div className="poke-info">
        <h4>Abilities</h4>
        {abilitiesArray !== undefined &&
          abilitiesArray.map((ability, index) => {
            return (
              <div key={ability.abilityName}>
                <div id={index} className="ability-name" onClick={toggleModal}>
                  {ability.abilityName}
                </div>
              </div>
            );
          })}
        {modalVisible && (
          <>
            <div className="ability-modal">
              <h4>{modal.abilityName}</h4>
              {modal.abilityInfo}
            </div>
            <span onClick={toggleModal} className="close-span">
              <span className="close-1"></span>
              <span className="close-2"></span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Info;
