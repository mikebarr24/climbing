import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";

function Map({ crags, user, api }) {
  const navigate = useNavigate();

  const markerClick = (marker) => {
    navigate(marker.cragName);
  };

  const displayMarkers = crags.map((marker) => {
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
    if (user && user.isAdmin) {
      navigate("/addcrag", {
        state: { lat: e.latLng.lat(), lng: e.latLng.lng(), type: "crag" },
      });
    }
  };
  if (!api) {
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
