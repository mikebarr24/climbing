import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import crags from "../api/crags";

function Map({ user }) {
  const navigate = useNavigate();
  const [allCrags, setAllCrags] = useState([]);

  const markerClick = (marker) => {
    navigate(marker.cragName);
  };

  useEffect(() => {
    const getAllCrags = async () => {
      const { data } = await crags.getAllCrags();
      setAllCrags(data);
    };
    getAllCrags();
  }, []);
  const displayMarkers = allCrags.map((marker) => {
    return (
      <Marker
        key={marker._id}
        position={{
          lat: parseFloat(marker.cragLocation.lat),
          lng: parseFloat(marker.cragLocation.lng),
        }}
        title={marker.cragName}
        onClick={() => {
          markerClick(marker);
        }}
      />
    );
  });
  const mapClick = (e) => {
    if (user.isAdmin) {
      navigate("/addcrag", {
        state: { lat: e.latLng.lat(), lng: e.latLng.lng(), type: "crag" },
      });
    }
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "", // ,
    // ...otherOptions
  });
  if (!isLoaded) {
    return <h2>Loading...</h2>;
  }
  return (
    <GoogleMap
      zoom={7}
      center={{ lat: 54.677809, lng: -6.774634 }}
      mapContainerClassName="map-container"
      onClick={mapClick}
    >
      {displayMarkers && displayMarkers}
    </GoogleMap>
  );
}

export default Map;
