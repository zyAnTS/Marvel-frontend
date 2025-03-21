import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "/src/assets/styles/cards.css";
import Favorite from "./Favorite";

const CharacterCard = ({ elem, key, userToken }) => {
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);

  const handleNavigate = () => {
    navigate("/character/" + elem._id);
  };

  return (
    <div className="character-card" key={key} onClick={handleNavigate}>
      <img
        src={
          elem.thumbnail.path + "/standard_xlarge." + elem.thumbnail.extension
        }
        alt={"apercu " + elem.name}
      />
      <Favorite
        favorite={favorite}
        setFavorite={setFavorite}
        userToken={userToken}
      />

      <div className="card-text">
        <h3>{elem.name}</h3>
      </div>
    </div>
  );
};

export default CharacterCard;
