import React from "react";

import banner from "../assets/img/marvel-banner.jpg";
import "/src/assets/styles/hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <img src={banner} alt="Bannière Marvel" />
    </div>
  );
};

export default Hero;
