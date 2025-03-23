import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "../assets/styles/login-signup.css";

import Input from "../components/Input";
import Button from "../components/Button";

const LogIn = ({ setUserToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <div className="authentication">
      <div className="container">
        <div onClick={handleNavigateHome}>
          <Button
            text="< Back home"
            icon=""
            showText={true}
            showIcon={false}
            classButton=""
          />
        </div>
        <div className="formulary">
          <h2>Welcome</h2>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (email === "") {
                setErrorEmail(true);
              } else if (password.length < 9) {
                setErrorPassword(true);
              } else {
                setErrorEmail(false);
                setErrorPassword(false);
                try {
                  const response = await axios.post(
                    "https://site--marvel--mz8pkhlfl2x7.code.run/user/login",
                    {
                      email: email,
                      password: password,
                    }
                  );
                  if (response.data.token) {
                    Cookies.set("token", response.data.token);
                    setUserToken(response.data.token);
                    setErrorMessage(false);
                    navigate("/");
                  } else {
                    setErrorMessage(true);
                  }
                } catch (error) {
                  setErrorMessage(true);
                  console.log(error.message);
                }
              }
            }}
          >
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              set={setEmail}
              showError={errorEmail}
              errorMessage="Please enter an email"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              set={setPassword}
              showError={errorPassword}
              errorMessage="Your password must be at least 8 characters long"
            />

            {errorMessage && (
              <p className="error">Incorrect email or password</p>
            )}
            <button type="submit" className="button-large">
              Log in
            </button>
          </form>
          <button
            onClick={() => {
              setErrorMessage(false);
              navigate("/signup");
            }}
          >
            Don't have an account yet? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
