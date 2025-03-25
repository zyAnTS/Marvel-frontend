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

  const handlePost = async (event) => {
    event.stopPropagation();
    elem.favorite = true;
    if (userToken) {
      try {
        const response = await axios.post(
          "http://localhost:3000/favorites/character",
          {
            thumbnail,
            comics,
            name,
            title,
            description,
          },
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
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    elem.favorite = false;
    try {
      const response = await axios.delete(
        "https://site--marvel--mz8pkhlfl2x7.code.run/favorites/character/" +
          elem._id
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {elem.favorite ? (
        <button className="favorite-add" onClick={handleDelete}>
          <i className="fa-solid fa-heart"></i>
        </button>
      ) : (
        <button className="favorite" onClick={handlePost}>
          <i className="fa-regular fa-heart"></i>
        </button>
      )}
    </>
  );
};

export default Favorite;
