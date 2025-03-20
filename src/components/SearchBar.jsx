import React from "react";

import "/src/assets/styles/searchbar.css";

const SearchBar = ({ label, id, type, value, set }) => {
  return (
    <label htmlFor={id} className="searchbar">
      <h2>{label}</h2>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={(event) => {
          set(event.target.value);
        }}
      />
    </label>
  );
};

export default SearchBar;
