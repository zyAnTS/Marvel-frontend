import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Carousel from "../components/Carousel";

const Character = () => {
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
      <Carousel comics={comicsCharacter} />
    </div>
  );
};

export default Character;
