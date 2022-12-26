import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

function BackArrow({ className, onClick }) {
  const STYLES = {
    fontSize: "4rem",
  };
  return (
    <span style={STYLES} className={className} onClick={onClick}>
      <AiOutlineArrowLeft />
    </span>
  );
}

export default BackArrow;
