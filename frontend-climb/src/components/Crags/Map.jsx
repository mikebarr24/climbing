import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiKeys from "../../api/ApiKeys";
import crags from "../../api/crags";

function Map() {
  const navigate = useNavigate();
  const [api, setApi] = useState(null);
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const { data } = await ApiKeys.mapsApi();
      setApi(data);
    };
    getApi();
  }, [api]);

  useEffect(() => {
    const getMarkers = async () => {
      const { data } = await crags.getAllCrags();
      setMarkers(data);
    };
    getMarkers();
  }, []);
  const markerClick = (marker) => {
    navigate(marker);
  };
  const displayMarkers = markers.map((marker) => {
    return (
      <Marker
        key={marker._id}
        position={{
          lat: parseFloat(marker.cragLocation.lat),
          lng: parseFloat(marker.cragLocation.lng),
        }}
        title={marker.cragName}
        onClick={() => {
          markerClick(marker.cragName);
        }}
      />
    );
  });
  if (!api) {
    return <h2>Loading...</h2>;
  }
  return (
    //Replace with api
    <LoadScript googleMapsApiKey={""}>
      <GoogleMap
        zoom={7}
        center={{ lat: 54.677809, lng: -6.774634 }}
        mapContainerClassName="map-container"
      >
        {displayMarkers && displayMarkers}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
