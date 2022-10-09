import React from "react";
import ReactDOM from "react-dom";
import "./AccountModal.scss";

function AccountModal({ user, open }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="account-modal--mask"></div>
      <div id="account-modal"></div>;
    </>,
    document.getElementById("portal")
  );
}

export default AccountModal;
