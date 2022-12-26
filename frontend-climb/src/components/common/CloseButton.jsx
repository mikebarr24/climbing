import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CloseButton({ onClick, className }) {
  const STYLE = {
    position: "absolute",
    right: "0.5rem",
    top: "0.5rem",
    fontSize: "5rem",
    width: "5rem",
    height: "5rem",
    zIndex: "1000",
  };
  return (
    <span onClick={onClick} className={className} style={STYLE}>
      <AiOutlineCloseCircle />
    </span>
  );
}

export default CloseButton;
