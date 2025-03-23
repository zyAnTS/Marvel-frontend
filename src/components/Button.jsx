import React from "react";

const Button = ({ text, icon, showIcon, classButton }) => {
  return (
    <button className={classButton}>
      {showIcon === true && <i className={icon}></i>}
      <p>{text}</p>
    </button>
  );
};

export default Button;
