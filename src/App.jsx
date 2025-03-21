import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "/src/assets/styles/generic.css";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [favorites, setFavorites] = useState([]);

  const [userToken, setUserToken] = useState(Cookies.get("token") || null);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home userToken={userToken} setUserToken={setUserToken} />}
          />
          <Route
            path="/characters"
            element={
              <Characters userToken={userToken} setUserToken={setUserToken} />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics userToken={userToken} setUserToken={setUserToken} />
            }
          />
          <Route
            path="/character/:id"
            element={
              <Character userToken={userToken} setUserToken={setUserToken} />
            }
          />
          <Route
            path="/login"
            element={<Login setUserToken={setUserToken} />}
          />
          <Route
            path="/signup"
            element={<Signup setUserToken={setUserToken} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
