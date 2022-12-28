import "./Crag.scss";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Map from "../Map";
import Button from "../Button/Button";
import SectorModal from "./Modal/SectorModal";
import crags from "../../api/crags";

function Crag({ user, api }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cragTrigger, setCragTrigger] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [sector, setSector] = useState([]);
  const [crag, setCrag] = useState(null);

  useEffect(() => {
    const local = async () => {
      const { data } = await crags.getCrag(state.markerId);
      setCrag(data);
    };
    local();
  }, [cragTrigger, state]);

  const markerClick = async ({ markerId }) => {
    setIsOpen(true);
    setSector(...crag.sectors.filter((sector) => sector._id === markerId));
  };

  function archiveCrag() {
    crags.archiveCrag(crag._id);
    navigate("/crags");
  }

  //Stop scrolling when modal is open
  if (isOpen === true) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
  return (
    <div id="crag" className="container">
      {crag && (
        <div className="crag-wrapper">
          <div className="crag--text">
            <h2 className="title-text">
              {crag.cragName.charAt(0).toUpperCase() + crag.cragName.slice(1)}
            </h2>
            <p className="standard-text">
              There are{" "}
              <strong>
                {crag.sectors.filter((sector) => !sector.archived).length}
              </strong>{" "}
              sectors at this crag
            </p>
            <div className="button-bar">
              <Button onClick={() => navigate("/crags")}>Back to Map</Button>
              {user && user.isAdmin && (
                <Button onClick={archiveCrag}>delete</Button>
              )}
            </div>
          </div>
          <Map
            api={api}
            zoom={13}
            mapPosition={crag.cragLocation}
            markerType="sector"
            markers={crag.sectors}
            currentCragId={crag._id}
            markerClick={markerClick}
          />
        </div>
      )}
      {isOpen === true && (
        <SectorModal
          open={isOpen}
          close={() => setIsOpen(false)}
          portalClassName="crag-modal"
          currentSector={sector}
          currentCrag={crag}
          user={user}
          cragTrigger={() => setCragTrigger(!cragTrigger)}
        />
      )}
    </div>
  );
}

export default Crag;
