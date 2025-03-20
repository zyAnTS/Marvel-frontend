import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import banner from "../../public/marvel-banner-characters.jpg";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

const Characters = () => {
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
          "http://localhost:3000/characters" + filtersCharacters
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
  console.log(name);

  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
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
          <div className="pagination">
            <div onClick={handlePrevious}>
              <Button
                text="< Previous"
                icon=""
                showText={true}
                showIcon={false}
                classButton=""
              />
            </div>{" "}
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
          <article>
            {characters.map((elem) => {
              return <CharacterCard elem={elem} key={elem._id} />;
            })}
          </article>
        </section>
      </div>
    </>
  );
};

export default Characters;
