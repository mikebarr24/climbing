import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Crags.scss";
import Map from "../Map";
import crags from "../../api/crags";

function Crags({ user, api }) {
  const [allCrags, setAllCrags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCrags = async () => {
      const { data } = await crags.getAllCrags();
      setAllCrags(data);
    };
    getAllCrags();
  }, []);

  function markerClick(markerDetails) {
    navigate(`/crags/${markerDetails.name.toLowerCase()}`, {
      state: {
        markerId: markerDetails.markerId,
      },
    });
  }
  return (
    <div id="crags" className="container">
      <h2 className="page-title">Crags</h2>
      {user && user.isAdmin && (
        <p className="standard-text">
          Click on a Crag or click the map to add a new crag
        </p>
      )}
      <div>
        <Map
          user={user}
          api={api}
          zoom={7}
          markers={allCrags}
          markerType="crag"
          markerClick={markerClick}
        />
      </div>
    </div>
  );
}
export default Crags;
