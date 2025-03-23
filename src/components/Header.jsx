import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../assets/img/marvel-logo.png";
import "/src/assets/styles/header.css";

import Button from "./Button";

const Header = ({ userToken, setUserToken, user }) => {
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
  const handleNavigateFavorites = () => {
    navigate("/favorites/" + user.user._id);
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo Marvel" />
          </Link>
          <div className="connect">
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
          </div>
        </div>

        <nav>
          {" "}
          {userToken ? (
            <div onClick={handleNavigateFavorites}>
              <Button
                text="Favorites"
                icon="fa-regular fa-heart"
                showText={true}
                showIcon={true}
                classButton=""
              />
            </div>
          ) : (
            <div onClick={handleLogin}>
              <Button
                text="Favorites"
                icon="fa-regular fa-heart"
                showText={true}
                showIcon={true}
                classButton=""
              />
            </div>
          )}
          {userToken ? (
            <div onClick={handleLogout}>
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
        </nav>
        <div className="connect-mobile">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
