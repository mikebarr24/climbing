import "./Crag.scss";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button/Button";
import Modal from "./Modal";

function Crag({ user }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sector, setSector] = useState([]);
  const [error, setError] = useState(null);
  const [api, setApi] = useState(null);

  const { state: crag } = useLocation();

  const clickHandle = (e) => {
    setIsOpen(true);
    setSector(e);
  };

  //Stop scrolling when modal is open
  if (isOpen === true) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  let displayMarkers;
  if (crag) {
    displayMarkers = crag.sectors.map((sector, index) => {
      return (
        <MarkerF
          key={index}
          position={sector.sectorLocation}
          onClick={() => clickHandle(sector)}
          title={sector.sectorName}
        />
      );
    });
  }

  const mapClick = (e) => {
    if (user && user.isAdmin === true) {
      navigate("/crags/addsector", {
        state: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          type: "sector",
          cragName: crag.cragName,
        },
      });
    }
  };

  return (
    <div id="crag" className="container">
      <Button name="Back to Map" onClick={() => navigate("/crags")} />
      {crag && (
        <div className="crag-wrapper">
          <div className="crag--text">
            <h2 className="title-text">
              {crag.cragName.charAt(0).toUpperCase() + crag.cragName.slice(1)}
            </h2>
            <p className="standard-text">
              There are <strong>{crag.sectors.length}</strong> sectors at this
              crag
            </p>
          </div>

          <GoogleMap
            zoom={15}
            center={{
              lat: parseFloat(crag.cragLocation.lat),
              lng: parseFloat(crag.cragLocation.lng),
            }}
            mapContainerClassName="map-container"
            onClick={mapClick}
          >
            {displayMarkers}
          </GoogleMap>
        </div>
      )}
      <Modal
        open={isOpen}
        close={() => setIsOpen(false)}
        portalClassName="crag-modal"
        currentSector={sector}
        currentCrag={crag}
      />
    </div>
  );
}

export default Crag;
