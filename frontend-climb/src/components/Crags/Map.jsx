import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiKeys from "../../api/ApiKeys";

function Map() {
  const [api, setApi] = useState(null);
  useEffect(() => {
    const getApi = async () => {
      const { data } = await ApiKeys.mapsApi();
      setApi(data);
    };
    getApi();
  }, []);
  return (
    //Replace with api
    <LoadScript googleMapsApiKey={null}>
      <GoogleMap
        zoom={7}
        center={{ lat: 54.677809, lng: -6.774634 }}
        mapContainerClassName="map-container"
      ></GoogleMap>
    </LoadScript>
  );
}

export default Map;
