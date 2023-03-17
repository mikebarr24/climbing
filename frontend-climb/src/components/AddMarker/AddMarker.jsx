import "./AddMarker.scss";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import crags from "../../api/crags";
import Message from "../common/Message";
import FileUpload from "../common/FileUpload";

function AddCrag() {
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
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);

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

    switch (state.type) {
      case "crag":
        try {
          await crags.setCrag({
            cragName: marker.markerName,
            cragLocation: marker.markerLocation,
            information: marker.information,
          });
          navigate("/crags");
        } catch (error) {
          setMessage({ message: error.response.data, type: "error" });
        }
        break;
      case "sector":
        setMessage({ message: "Uploading" });
        const formData = new FormData();
        formData.append("file", image);
        formData.append("currentCrag", state.currentCrag);
        formData.append("sectorName", marker.markerName);
        formData.append("sectorLocationLng", marker.markerLocation.lng);
        formData.append("sectorLocationLat", marker.markerLocation.lat);
        formData.append("information", marker.information);
        try {
          await crags.setSector(formData);
          navigate(`/crags/${state.currentCrag}/${marker.markerName}`);
        } catch (error) {
          setMessage({ message: error.response.data, type: "error" });
        }
        break;
      default:
        console.log("Error adding Crag or Sector");
        break;
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
        {state.type === "sector" && (
          <FileUpload setImage={setImage} image={image} />
        )}
        <input type="submit" className="form-button" />
      </form>
      {message && <Message message={message} />}
    </div>
  );
}

export default AddCrag;
