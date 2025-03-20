import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "/src/assets/styles/generic.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";

function App() {
  const [characters, setCharacters] = useState(null);
  const [comics, setComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // filtrer
        let filtersCharacters = "";
        let filtersComics = "";

        if (name) {
          filtersCharacters += "?name=" + name;
        }

        if (title) {
          filtersComics += "?title=" + title;
        }

        if (page) {
          if (filtersCharacters) {
            filtersCharacters += "&page=" + page;
          } else {
            filtersCharacters += "?page=" + page;
          }
          if (filtersComics) {
            filtersComics += "&page=" + page;
          } else {
            filtersComics += "?page=" + page;
          }
        }

        if (limit) {
          if (filtersCharacters) {
            filtersCharacters += "&limit=" + limit;
          } else {
            filtersCharacters += "?limit=" + limit;
          }
          if (filtersComics) {
            filtersComics += "&limit=" + limit;
          } else {
            filtersComics += "?limit=" + limit;
          }
        }

        // récupérer
        const responseCharacters = await axios.get(
          "http://localhost:3000/characters" + filtersCharacters
        );
        const responseComics = await axios.get(
          "http://localhost:3000/comics" + filtersComics
        );

        // retourner
        setCharacters(responseCharacters.data);
        setComics(responseComics.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [name, title, page, limit]);

  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <Router>
        <Header setName={setName} setTitle={setTitle} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                characters={characters}
                comics={comics}
                setLimit={setLimit}
              />
            }
          />
          <Route
            path="/characters"
            element={
              <Characters
              // characters={characters}
              // name={name}
              // setName={setName}
              // setLimit={setLimit}
              // page={page}
              // setPage={setPage}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
              // comics={comics}
              // title={title}
              // setTitle={setTitle}
              // setLimit={setLimit}
              // page={page}
              // setPage={setPage}
              />
            }
          />
          <Route path="/character/:id" element={<Character />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
