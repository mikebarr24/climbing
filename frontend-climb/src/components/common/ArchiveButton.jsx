import React from "react";
import { BsTrash } from "react-icons/bs";

function ArchiveButton({ onClick, color }) {
  const STYLES = {
    color: color === "black" ? "black" : "white",
    fontSize: "3rem",
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
    cursor: "pointer",
    padding: "0.5rem",
  };
  return (
    <div style={STYLES} onClick={onClick}>
      <BsTrash />
    </div>
  );
}

export default ArchiveButton;
