import React from "react";

const Button = ({ text, icon, showText, showIcon, classButton }) => {
  return (
    <button className={classButton}>
      {showIcon === true && <i className={icon}></i>}
      {showText === true && <p>{text}</p>}
    </button>
  );
};

export default Button;
