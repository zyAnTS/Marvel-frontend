import React from "react";

import "/src/assets/styles/cards.css";

const ComicsCard = ({ elem, key }) => {
  return (
    <div className="card" key={key}>
      <img
        src={
          elem.thumbnail.path +
          "/portrait_fantastic." +
          elem.thumbnail.extension
        }
        alt={"apercu " + elem.title}
      />
      <span>{elem.title}</span>
    </div>
  );
};

export default ComicsCard;
