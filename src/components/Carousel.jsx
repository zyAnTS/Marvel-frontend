import React from "react";

import "/src/assets/styles/carousel.css";

const Carousel = ({ comics }) => {
  return (
    <div className="carousel">
      <p>Appears in comics</p>
      <div className="scroll">
        {comics.map((elem, index) => {
          return (
            <div className="carousel-card" key={index}>
              <img
                src={
                  elem.thumbnail.path +
                  "/portrait_medium." +
                  elem.thumbnail.extension
                }
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
