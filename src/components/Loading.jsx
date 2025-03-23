import React from "react";
import logo from "/src/assets/img/loading.png";

const Loading = () => {
  return (
    <div className="loading">
      <img src={logo} alt="Logo Marvel" />
      Chargement...
    </div>
  );
};

export default Loading;
