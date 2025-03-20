import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import banner from "../../public/marvel-banner-comics.jpg";
import ComicsCard from "../components/ComicsCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

const Comics = () => {
  const [comics, setComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
        let filtersComics = "";

        if (title) {
          filtersComics += "?title=" + title;
        }

        if (page) {
          if (filtersComics) {
            filtersComics += "&page=" + page;
          } else {
            filtersComics += "?page=" + page;
          }
        }

        if (limit) {
          if (filtersComics) {
            filtersComics += "&limit=" + limit;
          } else {
            filtersComics += "?limit=" + limit;
          }
        }

        // récupérer
        const responseComics = await axios.get(
          "http://localhost:3000/comics" + filtersComics
        );

        // retourner
        setComics(responseComics.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [title, page, limit]);

  return isLoading ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <div className="hero">
        <img src={banner} alt="Bannière Marvel" />
        <SearchBar
          label="Looking for an adventure?"
          type="text"
          id={title}
          value={title}
          set={setTitle}
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
            {comics.map((elem) => {
              return <ComicsCard elem={elem} key={elem._id} />;
            })}
          </article>
        </section>
      </div>
    </>
  );
};

export default Comics;
