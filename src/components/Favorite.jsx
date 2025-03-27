import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorite = ({ userToken, elem }) => {
  const navigate = useNavigate();

  const { pingFavorite, setPingFavorite } = useContext(FavoriteContext);

  const [thumbnail, setThumbnail] = useState(elem.thumbnail);
  const [comics, setComics] = useState(elem.comics);
  const [name, setName] = useState(elem.name);
  const [description, setDescription] = useState(elem.description);
  const [favorite, setFavorite] = useState(true);

  const handlePost = async (event) => {
    event.stopPropagation();
    elem.favorite = true;
    setPingFavorite(!pingFavorite);

    console.log(elem.comics);
    console.log(elem.thumbnail);

    if (userToken) {
      try {
        const response = await axios.post(
          "https://site--marvel--mz8pkhlfl2x7.code.run/favorites/character/",
          {
            name,
            description,
            thumbnail,
            comics,
            favorite,
          },
          {
            headers: {
              authorization: "Bearer " + userToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );

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
    setPingFavorite(!pingFavorite);
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
