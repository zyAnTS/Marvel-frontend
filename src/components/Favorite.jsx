import React from "react";
import { useNavigate } from "react-router-dom";

const Favorite = ({ favorite, setFavorite, userToken }) => {
  const navigate = useNavigate();

  const handleFavorite = (event) => {
    event.stopPropagation();
    userToken ? setFavorite(!favorite) : navigate("/login");
  };

  return (
    <>
      {favorite ? (
        <div className="favorite-add" onClick={handleFavorite}>
          <i className="fa-solid fa-heart"></i>
        </div>
      ) : (
        <div className="favorite" onClick={handleFavorite}>
          <i className="fa-regular fa-heart"></i>
        </div>
      )}
    </>
  );
};

export default Favorite;
