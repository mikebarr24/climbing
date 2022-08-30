import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiKeys from "../../api/ApiKeys";
import { getCrags } from "../../api/crags";

function Map() {
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
      const { data } = await getCrags();
      setMarkers(data);
    };
    getMarkers();
  }, []);
  const displayMarkers = markers.map((marker) => {
    console.log(marker.cragLocation.lat);
    return (
      <Marker
        key={marker._id}
        position={{
          lat: parseFloat(marker.cragLocation.lat),
          lng: parseFloat(marker.cragLocation.lng),
        }}
        title={marker.cragName}
      />
    );
  });

  return (
    //Replace with api
    <LoadScript googleMapsApiKey={null}>
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
