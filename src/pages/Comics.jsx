import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import banner from "../assets/img/marvel-banner-comics.jpg";
import ComicsCard from "../components/ComicsCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Comics = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();

  const [comics, setComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  const handlePrevious = () => {
    navigate("#top");
    setPage(page - 1);
  };
  const handleNext = () => {
    navigate("#top");
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
      <Header userToken={userToken} setUserToken={setUserToken} />
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
        <div id="top"></div>
        <section>
          <article>
            {comics.results.map((elem) => {
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
          / {Math.ceil(comics.count / limit)}
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

export default Comics;
