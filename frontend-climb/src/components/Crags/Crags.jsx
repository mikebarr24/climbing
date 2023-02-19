import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Help from "../../components/common/Help";
import Modal from "../common/Modal";
import "./Crags.scss";
import Map from "../Map";
import crags from "../../api/crags";

function Crags({ user, api }) {
  const [allCrags, setAllCrags] = useState([]);
  const [help, setHelp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCrags = async () => {
      const { data } = await crags.getAllCrags();
      setAllCrags(data);
    };
    getAllCrags();
  }, []);

  function markerClick(markerDetails) {
    navigate(`/crags/${markerDetails.name}`);
  }
  return (
    <div id="crags" className="container">
      <div className="crags--title-wrapper">
        <h2 className="page-title">Crags</h2>
        <Help onClick={() => setHelp(!help)} />
      </div>
      <Map
        user={user}
        api={api}
        zoom={7}
        markerType="crag"
        markers={allCrags}
        markerClick={markerClick}
      />
      {help && (
        <Modal close={() => setHelp(false)}>
          <h3>Click on a Crag to see the various sectors within.</h3>
          {user?.isAdmin && (
            <>
              <br />
              <h3>
                Admin Account:
                <p>Click anywhere on the map to add a new crag.</p>
              </h3>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
export default Crags;
