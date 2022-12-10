import "./Crag.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import Button from "../Button/Button";
import Modal from "./Modal";
import myCrag from "../../api/crags";
import crags from "../../api/crags";

function Crag({ user, api }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sector, setSector] = useState([]);
  const [crag, setCrag] = useState(null);
  const { cragName } = useParams();
  //This isn't efficient as querying server on page load. Need to look into Redux as I don't want to keep passing around useLocation json
  useEffect(() => {
    const internal = async () => {
      const { data } = await myCrag.getCrag(cragName);
      setCrag(data);
    };
    internal();
  }, [isOpen]);

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
  //If no crags, sectors is not iterated
  let displayMarkers;
  if (crag) {
    displayMarkers = crag.sectors.map((sector, index) => {
      if (!sector.archived) {
        return (
          <MarkerF
            key={index}
            position={sector.sectorLocation}
            onClick={() => clickHandle(sector)}
            title={sector.sectorName}
          />
        );
      }
    });
  }

  const mapClick = (e) => {
    if (user.isAdmin === true) {
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

  async function archiveCrag() {
    await crags.archiveCrag(crag._id);
    navigate("/crags");
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: api === "dev" ? "" : api,
  });
  if (!isLoaded) {
    return <h2>Loading...</h2>;
  }
  return (
    <div id="crag" className="container">
      {crag && (
        <div className="crag-wrapper">
          <div className="crag--text">
            <h2 className="title-text">
              {crag.cragName.charAt(0).toUpperCase() + crag.cragName.slice(1)}
            </h2>
            {user.isAdmin && <button onClick={archiveCrag}>Delete Crag</button>}
            <div className="crag--button-container">
              <Button name="Back to Map" onClick={() => navigate("/crags")} />
            </div>
            {}
            <p className="standard-text">
              There are{" "}
              <strong>
                {crag.sectors.filter((sector) => !sector.archived).length}
              </strong>{" "}
              sectors at this crag
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
        user={user}
      />
    </div>
  );
}

export default Crag;
