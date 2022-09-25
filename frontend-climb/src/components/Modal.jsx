import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

function Modal({ open, children, close }) {
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    zIndex: 1000,
  };

  const OVERLAY = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  };
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY} />
      <div className="crag-modal standard-text" style={MODAL_STYLES}>
        <button onClick={close} className="close-button">
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
