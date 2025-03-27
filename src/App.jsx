import React from "react";
import { useState, useEffect, createContext } from "react";
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
import Loading from "./components/Loading";

function App() {
  const FavoriteContext = createContext();

  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [pingFavorite, setPingFavorite] = useState(false);

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
        const response = await axios.get(
          "https://site--marvel--mz8pkhlfl2x7.code.run/user" + filter
        );

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
      <Loading />
    </>
  ) : (
    <>
      <FavoriteContext.Provider value={{ pingFavorite, setPingFavorite }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  userToken={userToken}
                  setUserToken={setUserToken}
                />
              }
            />
            <Route
              path="/characters"
              element={
                <Characters
                  user={user}
                  userToken={userToken}
                  setUserToken={setUserToken}
                />
              }
            />
            <Route
              path="/comics"
              element={
                <Comics
                  user={user}
                  userToken={userToken}
                  setUserToken={setUserToken}
                />
              }
            />
            <Route
              path="/character/:id"
              element={
                <Character
                  user={user}
                  userToken={userToken}
                  setUserToken={setUserToken}
                />
              }
            />
            <Route
              path="/favorites/:id"
              element={<Favorites user={user} userToken={userToken} />}
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
      </FavoriteContext.Provider>
    </>
  );
}

export default App;
