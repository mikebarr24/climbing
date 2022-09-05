import "./AddCrag.scss";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import crags from "../../api/crags";

function AddCrag(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const initCrag = {
    cragName: "",
    information: "",
    cragLocation: {
      lat: "",
      lng: "",
    },
  };
  const [crag, setCrag] = useState(initCrag);

  useEffect(() => {
    setCrag((x) => ({
      ...x,
      cragLocation: {
        lat: state.lat,
        lng: state.lng,
      },
    }));
  }, []);

  const submitHandle = async (e) => {
    e.preventDefault();
    await crags.setCrag(crag);
    navigate("/crags");
  };

  const changeHandle = (e) => {
    setCrag((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div id="addcrag" className="container">
      <h2 className="title-text">Add new Crag</h2>
      <form onSubmit={submitHandle} className="form-standard standard-text">
        <input
          type="text"
          placeholder="Enter Crag Name"
          name="cragName"
          className="form-field"
          value={crag.cragName}
          onChange={changeHandle}
        />
        <textarea
          name="information"
          id=""
          cols="30"
          rows="10"
          placeholder="Enter Crag Information"
          className="form-text"
          value={crag.information}
          onChange={changeHandle}
        ></textarea>
        <input
          type="text"
          readOnly
          className="form-field"
          value={crag.cragLocation.lat}
        />
        <input
          type="text"
          value={crag.cragLocation.lng}
          readOnly
          className="form-field"
        />
        <input type="submit" className="form-button" />
      </form>
    </div>
  );
}

export default AddCrag;
