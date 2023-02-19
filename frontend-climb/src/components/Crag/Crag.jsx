import "./Crag.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../Map";
import Button from "../Button/Button";
import SectorModal from "./Modal/SectorModal";
import crags from "../../api/crags";
import ArchiveButton from "../common/ArchiveButton";
import Help from "../common/Help";
import Modal from "../common/Modal";

function Crag({ user, api }) {
  const { cragName } = useParams();
  const navigate = useNavigate();
  const [cragTrigger, setCragTrigger] = useState(true);
  const [help, setHelp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [crag, setCrag] = useState(null);
  useEffect(() => {
    const local = async () => {
      const { data } = await crags.getCrag(cragName);
      setCrag(data);
    };
    local();
  }, [cragName]);

  const markerClick = async ({ name }) => {
    navigate(`/crags/${cragName}/${name}`);
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
            <div className="crag--title-wrapper">
              <Button
                className="crag--back-button"
                onClick={() => navigate("/crags")}
              >
                Crags
              </Button>
              <div className="crag--title">
                <h2 className="title-text">
                  {crag.cragName.charAt(0).toUpperCase() +
                    crag.cragName.slice(1)}
                </h2>
                {user?.isAdmin && (
                  <ArchiveButton onClick={archiveCrag} color="black" />
                )}
              </div>
              <Help
                text="This is some text in here"
                onClick={() => setHelp(true)}
                className="help-icon"
              />
            </div>
          </div>
          <Map
            user={user}
            api={api}
            zoom={13}
            mapPosition={crag.cragLocation}
            markerType="sector"
            markers={crag.sectors}
            currentCrag={crag.cragName}
            markerClick={markerClick}
          />
        </div>
      )}
      {isOpen === true && (
        <SectorModal
          close={() => setIsOpen(false)}
          portalClassName="crag-modal"
          currentCrag={crag}
          user={user}
          cragTrigger={() => setCragTrigger(!cragTrigger)}
        />
      )}
      {help && (
        <Modal close={() => setHelp(!help)}>
          <h3>Click on a Sector to view the routes within the sector.</h3>
          {user?.isAdmin && (
            <>
              <br />
              <h3>
                Admin Account:
                <p>Click on the map to add a new sector to the crag.</p>
              </h3>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Crag;
