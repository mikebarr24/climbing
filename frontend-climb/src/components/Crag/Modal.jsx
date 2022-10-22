import { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import Button from "../Button/Button";
import CloseButton from "../common/CloseButton";
import AddRouteForm from "./AddRouteForm";
import Route from "./Route";

function Modal({ open, currentSector, close, currentCrag }) {
  const [openAdd, setOpenAdd] = useState(false);

  const OVERLAY = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  };

  //If addRoute is open when close button is clicked, this will close modal and reset to sector view.
  const clickHandle = () => {
    close();
    setOpenAdd(false);
  };

  if (!open) return null;
  const routeList = currentSector.routes.map((route, index) => {
    return (
      <Route
        key={index}
        routeName={route.routeName}
        routeGrade={route.routeGrade}
        routeRating={route.routeRating}
      />
    );
  });
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY} />
      <div className="crag-modal standard-text">
        <CloseButton onClick={clickHandle} />
        <h2>Sector - {currentSector.sectorName}</h2>
        <div className="sector-photo">Photo of Sector here</div>
        <h3>Sector Info</h3>
        <p>{currentSector.information}</p>
        <div className="sector--route-container">
          <div className="crag--route-header">
            <h3>Routes</h3>
            <Button name="Add Route" onClick={() => setOpenAdd(!openAdd)} />
          </div>
          <div className="sector--route-list-wrapper">
            {routeList.length === 0 ? "No routes at this crag" : routeList}
          </div>
        </div>

        {openAdd && (
          <AddRouteForm
            close={() => setOpenAdd(!openAdd)}
            windowState={openAdd}
            currentCrag={currentCrag}
            currentSector={currentSector}
          />
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
