import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "../assets/styles/login-signup.css";

import Input from "../components/Input";
import Button from "../components/Button";

const Signup = ({ setUserToken }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState(false);
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
        <div
          className="formulary"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <h2>Registration</h2>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (username === "") {
                setErrorUsername(true);
              } else if (email === "") {
                setErrorEmail(true);
              } else if (password.length < 9) {
                setErrorPassword(true);
              } else {
                setErrorUsername(false);
                setErrorEmail(false);
                setErrorPassword(false);
                try {
                  const response = await axios.post(
                    "http://localhost:3000/user/signup",
                    {
                      email: email,
                      username: username,
                      password: password,
                    }
                  );

                  Cookies.set("token", response.data.token);
                  setUserToken(response.data.token);
                  navigate("/");
                } catch (error) {
                  setErrorMessage(true);
                  console.log(error.message);
                }
              }
            }}
          >
            <Input
              label="Hero / Vilain name"
              id="name"
              type="text"
              value={username}
              set={setUsername}
              showError={errorUsername}
              errorMessage="Please enter an identity"
            />
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

            {errorMessage && <p className="error">Already existing account</p>}
            <button className="button-large" type="submit">
              Register
            </button>
          </form>
          <button
            onClick={() => {
              setErrorMessage(false);
              navigate("/login");
            }}
          >
            Already registered ? Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
