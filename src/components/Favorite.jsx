import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorite = ({ userToken, elem }) => {
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState(elem.thumbnail);
  const [comics, setComics] = useState(elem.comics);
  const [name, setName] = useState(elem.name);
  const [title, setTitle] = useState(elem.title);
  const [description, setDescription] = useState(elem.description);
  const [favorite, setFavorite] = useState(true);

  return (
    <>
      {elem.favorite ? (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.delete(
                "https://site--marvel--mz8pkhlfl2x7.code.run/favorites/character/" +
                  elem._id
              );
              console.log(response.data);
            } catch (error) {
              console.log(error.response);
            }
          }}
        >
          <button
            className="favorite-add"
            onClick={(event) => {
              event.stopPropagation();
              elem.favorite = false;
            }}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </form>
      ) : (
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append("thumbnail", thumbnail);
            formData.append("comics", comics);
            formData.append("name", name);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("favorite", favorite);

            if (userToken) {
              try {
                const response = await axios.post(
                  "http://localhost:3000/favorites/character",
                  formData,
                  {
                    headers: {
                      authorization: "Bearer " + userToken,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log(elem.comics);

                console.log(response.data);
              } catch (error) {
                console.log(error.response);
              }
            } else {
              navigate("/login");
            }
          }}
        >
          <button
            className="favorite"
            onClick={(event) => {
              event.stopPropagation();
              elem.favorite = true;
            }}
          >
            <i className="fa-regular fa-heart"></i>
          </button>
        </form>
      )}
    </>
  );
};

export default Favorite;
