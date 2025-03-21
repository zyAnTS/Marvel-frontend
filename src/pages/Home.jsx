import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Hero from "../components/Hero";
import Star from "../components/Star";
import CharacterCard from "../components/CharacterCard";
import ComicsCard from "../components/ComicsCard";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();

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

  const handleNavigateCharacters = () => {
    navigate("/characters");
  };
  const handleNavigateComics = () => {
    navigate("/comics");
  };
  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <Header userToken={userToken} setUserToken={setUserToken} />
      <Hero />
      <div className="container">
        <div className="edito">
          <h1>Explore the Marvel Universe</h1>
          <p>
            Dive into a comprehensive catalog of iconic Marvel characters, along
            with the comics where they make their appearances. Whether you're a
            long-time fan or a new adventurer, easily explore the biographies,
            powers, and stories of your favorite heroes and villains. Each
            character is linked to the comics they've appeared in, allowing you
            to trace their adventures through the pages and eras. With a simple
            and intuitive interface, quickly find your heroes, discover new
            comics to read, and relive unforgettable moments from the Marvel
            Universe. Don't wait any longer, embark on an epic journey through
            the Marvelverse!
          </p>
        </div>
        <div className="prime">
          <div className="star-label">
            <h3>
              Spotlight <span>on</span>
            </h3>
          </div>
          <Star />
        </div>
        <section>
          <h2>Characters</h2>
          <article>
            {characters.results.map((elem) => {
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
            {comics.results.map((elem) => {
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
      <Footer />
    </>
  );
};

export default Home;
