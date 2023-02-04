import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

function Map({
  user,
  api,
  zoom,
  mapPosition,
  markerType,
  markers,
  markerClick,
  currentCragId,
}) {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: api === "dev" ? "" : api,
  });

  function mapCragClick(e) {
    if (user?.isAdmin) {
      navigate("/crags/add", {
        state: {
          type: "crag",
          location: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          },
        },
      });
    }
  }
  function mapSectorClick(e) {
    if (user?.isAdmin) {
      navigate("/crags/add", {
        state: {
          type: "sector",
          currentCragId: currentCragId,
          location: {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          },
        },
      });
    }
  }
  const displayMarkers = markers.map((marker) => {
    if (!marker.archived) {
      return (
        <MarkerF
          key={marker._id}
          markerId={marker._id}
          icon={{
            url: require("../media/icons/carabiner-icon.png"),
          }}
          position={{
            lat:
              markerType === "crag"
                ? marker.cragLocation.lat
                : marker.sectorLocation.lat,
            lng:
              markerType === "crag"
                ? marker.cragLocation.lng
                : marker.sectorLocation.lng,
          }}
          title={markerType === "crag" ? marker.cragName : marker.sectorName}
          onClick={() =>
            markerClick({
              markerId: marker._id,
              name: markerType === "crag" ? marker.cragName : marker.sectorName,
            })
          }
        />
      );
    } else {
      return null;
    }
  });

  if (!isLoaded) {
    return <h2>Loading...</h2>;
  }
  return (
    <GoogleMap
      zoom={zoom}
      center={!mapPosition ? { lat: 54.677809, lng: -6.774634 } : mapPosition}
      mapContainerClassName="map-container"
      onClick={markerType === "crag" ? mapCragClick : mapSectorClick}
    >
      {displayMarkers}
    </GoogleMap>
  );
}

export default Map;
