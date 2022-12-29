import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

function BackArrow({ className, onClick }) {
  const STYLES = {
    position: "absolute",
    left: "0rem",
    fontSize: "4rem",
    display: "flex",
    alignItems: "center",
  };
  return (
    <div style={STYLES} className={className} onClick={onClick}>
      <AiOutlineArrowLeft />
    </div>
  );
}

export default BackArrow;
