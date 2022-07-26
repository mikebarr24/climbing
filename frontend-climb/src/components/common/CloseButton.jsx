import React from "react";

function CloseButton({ onClick, className }) {
  const STYLE = {
    position: "absolute",
    color: "white",
    backgroundColor: "black",
    border: "0.3rem solid white",
    right: "-2.5rem",
    top: "-2.5rem",
    fontSize: "4rem",
    width: "5rem",
    height: "5rem",
    borderRadius: "100px",
    zIndex: "1000",
  };
  return (
    <>
      <button onClick={onClick} className={className} style={STYLE}>
        X
      </button>
    </>
  );
}

export default CloseButton;
