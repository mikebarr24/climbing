import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiKeys from "../api/ApiKeys";

function Map(props) {
  const navigate = useNavigate();
  const [api, setApi] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const { data } = await ApiKeys.mapsApi();
      setApi(data);
    };
    getApi();
  }, []);

  useEffect(() => {
    const getMarkers = async () => {
      const { data } = await props.markers;
      setMarkers(data);
    };
    getMarkers();
  }, []);

  const markerClick = (marker) => {
    navigate(marker.cragName);
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
          markerClick(marker);
        }}
      />
    );
  });

  if (!api) {
    return <h2>Loading...</h2>;
  }

  const mapClick = (e) => {
    navigate("/addcrag", {
      state: { lat: e.latLng.lat(), lng: e.latLng.lng(), type: "crag" },
    });
  };
  return (
    //Replace with api
    <LoadScript googleMapsApiKey={""}>
      <GoogleMap
        zoom={7}
        center={{ lat: 54.677809, lng: -6.774634 }}
        mapContainerClassName="map-container"
        onClick={mapClick}
      >
        {displayMarkers && displayMarkers}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
