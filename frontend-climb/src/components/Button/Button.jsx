import React from "react";
import "./Button.scss";

function Button({ name, className, color, onClick }) {
  let styles;
  if (color === "light") {
    styles = {
      backgroundColor: "#fff",
      color: "#000",
    };
  } else {
    styles = {
      backgroundColor: "#000",
      color: "#fff",
    };
  }
  return (
    <>
      <button
        className={`btn-home ${className}`}
        style={styles}
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
}

export default Button;
