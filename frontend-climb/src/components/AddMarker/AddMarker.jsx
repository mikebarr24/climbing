import "./AddMarker.scss";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import crags from "../../api/crags";
import ErrorMessage from "../ErrorMessage";

function AddCrag({ currentCrag }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initMarker = {
    markerName: "",
    information: "",
    markerLocation: {
      lat: "",
      lng: "",
    },
  };
  const [marker, setMarker] = useState(initMarker);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMarker((x) => ({
      ...x,
      markerLocation: {
        lat: state.location.lat,
        lng: state.location.lng,
      },
    }));
  }, [state.location]);

  const submitHandle = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      switch (state.type) {
        case "crag":
          console.log("crag");
          await crags.setCrag({
            cragName: marker.markerName,
            cragLocation: marker.markerLocation,
            information: marker.information,
          });
          navigate("/crags");
          break;
        case "sector":
          console.log("sector");
          await crags.setSector({
            currentCrag: state.currentCrag,
            sectorName: marker.markerName,
            sectorLocation: marker.markerLocation,
            information: marker.information,
          });
          navigate(`/crags/${state.currentCrag}/${marker.markerName}`);
          break;
        default:
          console.log("Error adding Crag or Sector");
          break;
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  const changeHandle = (e) => {
    setMarker((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div id="addcrag" className="container">
      <h2 className="title-text">
        {state.type === "crag" ? "Add New Crag" : "Add New Sector"}
      </h2>
      <form onSubmit={submitHandle} className="form-standard standard-text">
        <input
          type="text"
          placeholder="Enter Name"
          name="markerName"
          className="form-field"
          value={marker.markerName}
          onChange={changeHandle}
        />
        <textarea
          name="information"
          id=""
          cols="30"
          rows="10"
          placeholder="Enter Information"
          className="form-text"
          value={marker.information}
          onChange={changeHandle}
        ></textarea>
        <input type="submit" className="form-button" />
      </form>
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
}

export default AddCrag;
