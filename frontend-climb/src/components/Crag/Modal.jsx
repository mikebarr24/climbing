import { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import Button from "../Button/Button";
import CloseButton from "../common/CloseButton";
import AddRouteForm from "./AddRouteForm";

function Modal({ open, sector, close }) {
  const [openAdd, setOpenAdd] = useState(false);

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
      <div className="crag-modal standard-text">
        <CloseButton onClick={close} />
        <h2>Sector - {sector.sectorName}</h2>
        <div className="sector-photo">Photo of Sector here</div>
        <h3>Sector Info</h3>
        <p>{sector.information}</p>
        <div className="crag--route-header">
          <h3>Routes</h3>
          <Button
            name={openAdd === false ? "Add Route" : "Close Form"}
            onClick={() => setOpenAdd(!openAdd)}
          />
        </div>
        {openAdd && <AddRouteForm />}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
