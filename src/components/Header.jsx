import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../public/marvel-logo.png";
import "/src/assets/styles/header.css";

import Button from "./Button";

const Header = ({ setName, setTitle }) => {
  const navigate = useNavigate();

  const handleNavigateCharacters = () => {
    setTitle("");
    navigate("/characters");
  };
  const handleNavigateComics = () => {
    setName("");
    navigate("/comics");
  };
  const handleAlert = () => {
    alert("Coming soon");
  };

  return (
    <header>
      <div className="container">
        <nav>
          <div onClick={handleNavigateCharacters}>
            <Button
              text="Characters"
              icon=""
              showText={true}
              showIcon={false}
              classButton=""
            />
          </div>
          <div onClick={handleNavigateComics}>
            <Button
              text="Comics"
              icon=""
              showText={true}
              showIcon={false}
              classButton=""
            />
          </div>
        </nav>
        <Link to="/">
          <img src={logo} alt="Logo Marvel" />
        </Link>
        <div onClick={handleAlert}>
          <Button
            text="Log In | Sign Up"
            icon="fa-regular fa-user"
            showText={true}
            showIcon={true}
            classButton=""
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
