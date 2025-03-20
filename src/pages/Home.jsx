import React from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import Star from "../components/Star";
import CharacterCard from "../components/CharacterCard";
import ComicsCard from "../components/ComicsCard";
import Button from "../components/Button";

const Home = ({ characters, comics, setLimit }) => {
  const navigate = useNavigate();

  setLimit(10);

  const handleNavigateCharacters = () => {
    navigate("/characters");
  };
  const handleNavigateComics = () => {
    navigate("/comics");
  };

  return (
    <>
      <Hero />
      <div className="container">
        <Star character={characters} />
        <h1>Marvel</h1>
        <p>Retrouver les listes des héros et de leurs comics</p>
        <section>
          <h2>Characters</h2>
          <article>
            {characters.map((elem) => {
              return <CharacterCard elem={elem} />;
            })}
          </article>
          <div onClick={handleNavigateCharacters}>
            <Button
              text="See all"
              icon="fa-regular fa-eye"
              showText={true}
              showIcon={true}
              classButton="button-large"
            />
          </div>
        </section>
        <section>
          <h2>Comics</h2>
          <article>
            {comics.map((elem) => {
              return <ComicsCard elem={elem} />;
            })}
          </article>
          <div onClick={handleNavigateComics}>
            <Button
              text="Seel all"
              icon="fa-regular fa-eye"
              showText={true}
              showIcon={true}
              classButton="button-large"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
