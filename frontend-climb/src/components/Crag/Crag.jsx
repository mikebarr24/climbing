import "./Crag.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ErrorMessage from "../ErrorMessage";
import crags from "../../api/crags";
import Button from "../Button/Button";

function Crag() {
  const params = useParams();
  const navigate = useNavigate();
  const [crag, setCrag] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);

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
  }, [params.cragName]);

  const displayMarkers = markers.map((marker) => {
    return <Marker key={marker._id} />;
  });

  return (
    <div id="crag" className="container">
      <Button name="Back to Map" onClick={() => navigate("/crags")} />
      {crag && (
        <div className="crag-wrapper">
          <h2 className="title-text">
            {crag.cragName.charAt(0).toUpperCase() + crag.cragName.slice(1)}
          </h2>
          {/* Replae with google API */}
          <LoadScript googleMapsApiKey="">
            <GoogleMap
              zoom={15}
              center={{
                lat: parseFloat(crag.cragLocation.lat),
                lng: parseFloat(crag.cragLocation.lng),
              }}
              mapContainerClassName="map-container"
            ></GoogleMap>
          </LoadScript>
        </div>
      )}
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
}

export default Crag;
