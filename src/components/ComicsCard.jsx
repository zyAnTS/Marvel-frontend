import React from "react";

import "/src/assets/styles/cards.css";
import Favorite from "./Favorite";

const ComicsCard = ({ elem, key, userToken }) => {
  return (
    <div className="comics-card" key={key}>
      <div className="card-img">
        <img
          src={
            elem.thumbnail.path +
            "/portrait_incredible." +
            elem.thumbnail.extension
          }
          alt={"apercu " + elem.title}
        />
      </div>
      <div className="card-text">
        <div className="comics-card-title">
          <h3>{elem.title}</h3>
          <Favorite userToken={userToken} elem={elem} />
        </div>
        <p>{elem.description}</p>
      </div>
    </div>
  );
};

export default ComicsCard;
