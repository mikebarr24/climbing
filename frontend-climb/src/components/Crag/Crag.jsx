import "./Crag.scss";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ErrorMessage from "../ErrorMessage";
import crags from "../../api/crags";
import Button from "../Button/Button";
import Modal from "./Modal";
import ApiKeys from "../../api/ApiKeys";
import auth from "../../api/auth";

function Crag() {
  const params = useParams();
  const navigate = useNavigate();
  const [crag, setCrag] = useState(null);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sector, setSector] = useState([]);
  const [error, setError] = useState(null);

  const api = useRef(null);

  useEffect(() => {
    const getApi = async () => {
      const { data } = await ApiKeys.mapsApi();
      api.current = data;
    };
    getApi();
  }, [crag]);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, [crag]);

  useEffect(() => {
    const getCrag = async () => {
      try {
        const { data } = await crags.getCrag(params.cragName);
        setCrag(data);
      } catch (error) {
        setError(error.response.data);
      }
    };
    getCrag();
  }, []);

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
    displayMarkers = crag.sectors.map((marker) => {
      return (
        <Marker
          key={marker._id}
          position={marker.sectorLocation}
          onClick={() => clickHandle(marker)}
          title={marker.sectorName}
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
  if (!api) {
    return <h2>Loading...</h2>;
  }
  console.log(api);
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
          <LoadScript
            googleMapsApiKey={api.current === "dev" ? "" : api.current}
          >
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
          </LoadScript>
        </div>
      )}
      {error && <ErrorMessage errorMessage={error} />}
      <Modal
        open={isOpen}
        close={() => setIsOpen(false)}
        portalClassName="crag-modal"
        sector={sector}
      />
    </div>
  );
}

export default Crag;
