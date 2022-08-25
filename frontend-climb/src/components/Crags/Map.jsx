import React from "react";
import GoogleMapReact from "google-map-react";

function Map(props) {
  const defaultProps = {
    center: {
      lat: 54.694655,
      lng: -6.899781,
    },
    zoom: 7,
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    />
  );
}

export default Map;
