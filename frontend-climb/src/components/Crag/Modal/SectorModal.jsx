import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./SectorModal.scss";
import Button from "../../Button/Button";
import CloseButton from "../../common/CloseButton";
import AddRouteForm from "./AddRouteForm";
import Route from "./Route";
import crags from "../../../api/crags";

function SectorModal({ open, currentSector, close, currentCrag, user }) {
  const [openForm, setOpenForm] = useState(false);
  const [routes, setRoutes] = useState(currentSector.routes);

  const OVERLAY = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  };

  const addRouteClick = async () => {
    const { data } = await crags.getRoutes(currentCrag._id, currentSector._id);
    setRoutes(data);
  };

  //If addRoute is open when close button is clicked, this will close modal and reset to sector view.
  const clickHandle = () => {
    close();
    setOpenForm(false);
  };

  const archiveSector = async () => {
    await crags.archiveSector(currentCrag._id, currentSector._id);
    close();
  };

  if (!open) return null;
  const routeList = routes.map((route, index) => {
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
        {user.isAdmin && (
          <Button onClick={archiveSector} name="Delete Sector" />
        )}
        <div className="sector-photo">Photo of Sector here</div>
        <h3>Sector Info</h3>
        <p>{currentSector.information}</p>
        <div className="sector--route-container">
          <div className="crag--route-header">
            <h3>Routes</h3>
            <Button name="Add Route" onClick={() => setOpenForm(!openForm)} />
          </div>
          <div className="sector--route-list-wrapper">
            <div className="sector--route-title-wrapper">
              <p className="sector--route-title">Route Name</p>
              <p className="sector--route-title">Grade</p>
              <p className="sector--route-title right">Rating</p>
            </div>
            {routeList.length === 0 ? "No routes at this crag" : routeList}
          </div>
        </div>

        {openForm && (
          <AddRouteForm
            close={() => setOpenForm(!openForm)}
            windowState={openForm}
            currentCrag={currentCrag}
            currentSector={currentSector}
            addRouteClick={() => addRouteClick()}
          />
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default SectorModal;
