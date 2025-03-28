import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import ComicsCard from "../components/ComicsCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Character = ({ userToken, setUserToken, user }) => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(null);
  const [comicsCharacter, setComicsCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCharacter = await axios.get(
          "https://site--marvel--mz8pkhlfl2x7.code.run/character/" + id
        );
        const responseComicsCharacter = await axios.get(
          "https://site--marvel--mz8pkhlfl2x7.code.run/comics/" + id
        );

        setCharacter(responseCharacter.data);
        setComicsCharacter(responseComicsCharacter.data);
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
      <Header userToken={userToken} setUserToken={setUserToken} user={user} />
      <div className="container">
        <div className="star">
          <img
            src={
              character.thumbnail.path +
              "/portrait_uncanny." +
              character.thumbnail.extension
            }
            alt="Hero portrait"
          />
          <div className="text-col">
            <h1>{character.name}</h1>
            <p>{character.description}</p>
          </div>
        </div>
        {comicsCharacter.length > 0 && (
          <div className="text-col">
            <h2>Appears in comics</h2>
            <article>
              {comicsCharacter.map((elem) => {
                return (
                  <ComicsCard
                    elem={elem}
                    key={elem._id}
                    userToken={userToken}
                  />
                );
              })}
            </article>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Character;
