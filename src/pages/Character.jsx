import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import ComicsCard from "../components/ComicsCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Character = ({ userToken, setUserToken }) => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(null);
  const [comicsCharacter, setComicsCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCharacter = await axios.get(
          "http://localhost:3000/character/" + id
        );
        const responseComicsCharacter = await axios.get(
          "http://localhost:3000/comics/" + id
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
      <p>Loading</p>
    </>
  ) : (
    <>
      <Header userToken={userToken} setUserToken={setUserToken} />
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
        <div className="text-col">
          <h2>Appears in comics</h2>
          <article>
            {comicsCharacter.map((elem) => {
              return (
                <ComicsCard
                  elem={elem}
                  key={elem._id}
                  userToken={userToken}
                  setUserToken={setUserToken}
                />
              );
            })}
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Character;
