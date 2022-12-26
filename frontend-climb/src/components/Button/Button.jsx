import React from "react";
import "./Button.scss";
import { BsTrash } from "react-icons/bs";

function Button({ children, className, color, onClick }) {
  const STYLES = {
    backgroundColor: color === "light" ? "#FFF" : "#000",
    color: color === "light" ? "#000" : "#fff",
  };
  return (
    <>
      <button
        className={`btn-home ${className}`}
        style={STYLES}
        onClick={onClick}
      >
        {children === "delete" ? <BsTrash /> : children}
      </button>
    </>
  );
}

export default Button;
