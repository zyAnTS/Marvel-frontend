import React from "react";

import logo from "../../public/marvel-logo-white.png";
import "/src/assets/styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <img src={logo} alt="Logo Marvel" />
        <div className="text-col">
          <div className="text-row">
            Made with <span>React</span> by
            <span>Yann Treuiller-Schlachter</span> - 2025
          </div>
          All rights reserved : © Marvel
        </div>
      </div>
    </footer>
  );
};

export default Footer;
