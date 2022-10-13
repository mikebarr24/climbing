import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./AccountModal.scss";
import CloseButton from "../common/CloseButton";
import Auth from "../../api/Auth";
import Button from "../Button/Button";
import PasswordChange from "./PasswordChange";

function AccountModal({ user, open, close }) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [openPassword, setOpenPassword] = useState(false);
  useEffect(() => {
    setDetails(user);
  }, [open]);
  if (!open) return null;
  document.body.style.overflowY = "hidden";
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

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      await Auth.updateUser(details);
      close();
      window.location = `/account/${details.name}`;
    } catch (error) {
      setError(error.response.data);
    }
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setOpenPassword(!openPassword);
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
            <button className="form-button" onClick={handlePassword}>
              {!openPassword ? "Change Password" : "Close"}
            </button>
          </form>
        )}
        {openPassword && (
          <PasswordChange password={(error) => setError(error)} />
        )}
        {error && <h2 className="form-error">{error}</h2>}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default AccountModal;
