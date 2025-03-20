import React from "react";
import { useNavigate } from "react-router-dom";

import "/src/assets/styles/cards.css";

const CharacterCard = ({ elem, key }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/character/" + elem._id);
  };

  return (
    <div className="card" key={key} onClick={handleNavigate}>
      <img
        src={
          elem.thumbnail.path + "/standard_xlarge." + elem.thumbnail.extension
        }
        alt={"apercu " + elem.name}
      />

      <div className="card-text">
        <h3>{elem.name}</h3>
      </div>
    </div>
  );
};

export default CharacterCard;
