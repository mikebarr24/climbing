import React from "react";
import "./Button.scss";

function Button(props) {
  let styles;
  if (props.color === "light") {
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
      <button className={`btn-home ${props.className}`} style={styles} onClick={props.onClick} >
        {props.name}
      </button>
    </>
  );
}

export default Button;
