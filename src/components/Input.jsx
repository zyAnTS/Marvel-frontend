import React from "react";

const Input = ({ label, id, type, value, set, showError, errorMessage }) => {
  return (
    <label htmlFor={id}>
      <span>{label}</span>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={(event) => {
          set(event.target.value);
        }}
        className={showError ? "input-error" : ""}
      />
      {showError ? <p className="error">{errorMessage}</p> : ""}
    </label>
  );
};

export default Input;
