import React from "react";

import Carousel from "./Carousel";
import "/src/assets/styles/star.css";

const Star = ({ character }) => {
  let choosenOne = Math.floor(Math.random() * 10) + 1;
  let num = Number(choosenOne);

  return (
    <div className="star">
      <img
        src={
          character[num].thumbnail.path +
          "/portrait_uncanny." +
          character[num].thumbnail.extension
        }
        alt="Hero portrait"
      />
      <div className="text-col">
        <h1>{character[num].name}</h1>
        <p>{character[num].description}</p>
        {/* <Carousel comics={character[77].comics} /> */}
      </div>
    </div>
  );
};

export default Star;
