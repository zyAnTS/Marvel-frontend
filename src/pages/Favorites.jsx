import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import CharacterCard from "../components/CharacterCard";
import ComicsCard from "../components/ComicsCard";

const Favorites = (userToken, user) => {
  const [characters, setCharacters] = useState(null);
  const [comics, setComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // récupérer
        const responseCharacters = await axios.get(
          "https://site--marvel--mz8pkhlfl2x7.code.run/favorites/character?owner=" +
            id
        );
        const responseComics = await axios.get(
          "https://site--marvel--mz8pkhlfl2x7.code.run/favorites/comics?owner=" +
            id
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
  }, [id]);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <Header />
      <div className="container">
        <h1>Your favorites</h1>
        {characters.length > 0 ? (
          <section>
            <h2>Characters</h2>
            <article>
              {characters.map((elem) => {
                return (
                  <CharacterCard
                    elem={elem}
                    key={elem._id}
                    characters={characters}
                    setCharacters={setCharacters}
                    userToken={userToken}
                  />
                );
              })}
            </article>
          </section>
        ) : (
          <p>No hero / vilain in your favorites</p>
        )}
        {comics.length > 0 ? (
          <section>
            <h2>Comics</h2>
            <article>
              {comics.map((elem) => {
                return (
                  <ComicsCard
                    elem={elem}
                    key={elem._id}
                    userToken={userToken}
                    comics={comics}
                    setComics={setComics}
                  />
                );
              })}
            </article>
          </section>
        ) : (
          <p>No awesome adventures in your favorites</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
