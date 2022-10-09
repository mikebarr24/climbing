import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./AccountModal.scss";
import CloseButton from "../common/CloseButton";

function AccountModal({ user, open, close }) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    setDetails(user);
  }, [open]);
  if (!open) return null;
  const OVERLAY_STYLES = {
    backgroundColor: "rgba(0,0,0, 0.7)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const updateHandle = (e) => {
    setDetails((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(details);
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="account-modal--overlay"
        style={OVERLAY_STYLES}
        onClick={close}
      />
      <div id="account-modal" className="container standard-text">
        <CloseButton onClick={close} />
        <h2>Edit Account Details</h2>
        {details && (
          <form className="form-standard" onSubmit={submitHandle}>
            <input
              type="text"
              className="form-field"
              value={details.name}
              name="name"
              onChange={updateHandle}
            />
            <input
              type="email"
              className="form-field"
              value={details.email}
              name="email"
              onChange={updateHandle}
            />
            <input type="submit" className="form-button" value="Update" />
          </form>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default AccountModal;
