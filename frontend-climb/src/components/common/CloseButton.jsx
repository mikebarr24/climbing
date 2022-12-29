import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CloseButton({ onClick, className, color }) {
  const STYLE = {
    fontSize: "5rem",
    width: "5rem",
    position: "absolute",
    right: "0.3rem",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
  };
  return (
    <div onClick={onClick} className={className} style={STYLE}>
      <AiOutlineCloseCircle />
    </div>
  );
}

export default CloseButton;
