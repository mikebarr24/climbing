import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CloseButton({ onClick, className }) {
  const STYLE = {
    fontSize: "5rem",
    width: "5rem",
    zIndex: "1000",
  };
  return (
    <div onClick={onClick} className={className} style={STYLE}>
      <AiOutlineCloseCircle />
    </div>
  );
}

export default CloseButton;
