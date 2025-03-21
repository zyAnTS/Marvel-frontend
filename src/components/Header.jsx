import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/img/marvel-logo.png";
import "/src/assets/styles/header.css";

import Button from "./Button";

const Header = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();

  const handleNavigateCharacters = () => {
    navigate("/characters");
  };
  const handleNavigateComics = () => {
    navigate("/comics");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    Cookies.remove("token");
    setUserToken(null);
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
        {userToken ? (
          <div onClick={handleLogin}>
            <Button
              text="Log Out"
              icon="fa-regular fa-circle-xmark"
              showText={true}
              showIcon={true}
              classButton=""
            />
          </div>
        ) : (
          <div onClick={handleLogin}>
            <Button
              text="Log In | Sign Up"
              icon="fa-regular fa-user"
              showText={true}
              showIcon={true}
              classButton=""
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
