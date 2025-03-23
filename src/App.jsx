import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "/src/assets/styles/generic.css";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // filtrer
        let filter = "";

        if (userToken) {
          filter += "?token=" + userToken;
        }

        // récupérer
        const response = await axios.get("http://localhost:3000/user" + filter);

        // retourner
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userToken={userToken}
                setUserToken={setUserToken}
                user={user}
              />
            }
          />
          <Route
            path="/characters"
            element={
              <Characters
                userToken={userToken}
                setUserToken={setUserToken}
                user={user}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                userToken={userToken}
                setUserToken={setUserToken}
                user={user}
              />
            }
          />
          <Route
            path="/character/:id"
            element={
              <Character
                userToken={userToken}
                setUserToken={setUserToken}
                user={user}
              />
            }
          />
          <Route
            path="/favorites/:id"
            element={<Favorites userToken={userToken} user={user} />}
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
