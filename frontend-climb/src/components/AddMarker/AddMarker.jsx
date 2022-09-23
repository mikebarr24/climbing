import "./AddMarker.scss";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import crags from "../../api/crags";

function AddCrag(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const initMarker = {
    markerName: "",
    information: "",
    markerLocation: {
      lat: "",
      lng: "",
    },
  };
  const [marker, setMarker] = useState(initMarker);

  useEffect(() => {
    setMarker((x) => ({
      ...x,
      markerLocation: {
        lat: state.lat,
        lng: state.lng,
      },
    }));
  }, []);

  const submitHandle = async (e) => {
    e.preventDefault();
    if (state.type === "crag") {
      await crags.setCrag({
        cragName: marker.markerName,
        cragLocation: marker.markerLocation,
        information: marker.information,
      });
      navigate("/crags");
    }
    if (state.type === "sector") {
      await crags.setSector({
        currentCrag: state.cragName,
        sectorName: marker.markerName,
        sectorLocation: marker.markerLocation,
      });
      navigate("/crags");
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
      <h2 className="title-text">Add new Marker</h2>
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
        <input
          type="text"
          readOnly
          className="form-field"
          value={marker.markerLocation.lat}
        />
        <input
          type="text"
          value={marker.markerLocation.lng}
          readOnly
          className="form-field"
        />
        <input type="submit" className="form-button" />
      </form>
    </div>
  );
}

export default AddCrag;
