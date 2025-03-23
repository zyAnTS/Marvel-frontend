import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import banner from "../assets/img/marvel-banner-characters.jpg";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Characters = ({ userToken, setUserToken, user }) => {
  const [characters, setCharacters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  const handlePrevious = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePage = (event) => {
    setPage(event.target.value);
    // if (event.target.value > 0 && event.target.value < 500) {
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // filtrer
        let filtersCharacters = "";

        if (name) {
          filtersCharacters += "?name=" + name;
        }

        if (page) {
          if (filtersCharacters) {
            filtersCharacters += "&page=" + page;
          } else {
            filtersCharacters += "?page=" + page;
          }
        }

        if (limit) {
          if (filtersCharacters) {
            filtersCharacters += "&limit=" + limit;
          } else {
            filtersCharacters += "?limit=" + limit;
          }
        }

        // récupérer
        const responseCharacters = await axios.get(
          "https://site--marvel--mz8pkhlfl2x7.code.run/characters" +
            filtersCharacters
        );

        // retourner
        setCharacters(responseCharacters.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [name, page, limit]);

  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <Header userToken={userToken} setUserToken={setUserToken} user={user} />
      <div className="hero">
        <img src={banner} alt="Bannière Marvel" />
        <SearchBar
          label="who are you gonna call?"
          type="text"
          id={name}
          value={name}
          set={setName}
        />
      </div>
      <div className="container">
        <section>
          <article>
            {characters.results.map((elem) => {
              return (
                <CharacterCard
                  elem={elem}
                  key={elem._id}
                  userToken={userToken}
                />
              );
            })}
          </article>
        </section>
      </div>
      <div className="pagination">
        <div onClick={handlePrevious}>
          <Button
            text="< Previous"
            icon=""
            showText={true}
            showIcon={false}
            classButton=""
          />
        </div>
        <div className="pagination-choose">
          <input
            type="number"
            name={page}
            id={page}
            value={page}
            onChange={handlePage}
          />
          / {Math.ceil(characters.count / limit)}
        </div>
        <div onClick={handleNext}>
          <Button
            text="Next >"
            icon=""
            showText={true}
            showIcon={false}
            classButton=""
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Characters;
