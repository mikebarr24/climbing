import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map() {
  return (
    <GoogleMap
      zoom={7}
      center={{ lat: 54.677809, lng: -6.774634 }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}

export default Map;
