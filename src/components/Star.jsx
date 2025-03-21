import React from "react";
import { useNavigate } from "react-router-dom";

import "/src/assets/styles/star.css";
import stars from "../assets/data/stars.json";

const Star = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/character/" + stars[num]._id);
  };

  let choosenOne = Math.floor(Math.random() * stars.length) + 1;
  let num = Number(choosenOne);

  return (
    <div className="star" onClick={handleNavigate}>
      <img
        src={
          stars[num].thumbnail.path +
          "/portrait_uncanny." +
          stars[num].thumbnail.extension
        }
        alt="Hero portrait"
      />
      <div className="text-col">
        <h1>{stars[num].name}</h1>
        <p>{stars[num].description}</p>
      </div>
    </div>
  );
};

export default Star;
