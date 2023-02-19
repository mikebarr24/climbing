import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

function Modal({ children, close }) {
  const STYLES = {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1000,
  };
  const MODALWRAPPER = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    minWidth: "30rem",
  };
  return ReactDOM.createPortal(
    <div style={STYLES} onClick={close}>
      <div style={MODALWRAPPER}>
        {children}
        <br />
        <Button onClick={close}>Close</Button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
