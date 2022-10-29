import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ApiKeys from "../api/ApiKeys";
import Auth from "../api/Auth";
import crags from "../api/crags";

function Map(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allCrags, setAllCrags] = useState([]);
  const [api, setApi] = useState(null);

  useEffect(() => {
    setUser(Auth.getCurrentUser());
  }, []);

  //Get all crag data from DB
  useEffect(() => {
    const getAllCrags = async () => {
      const { data } = await crags.getAllCrags();
      setAllCrags(data);
    };
    getAllCrags();
    console.log("here");
  }, []);

  //Set Google Map Api
  useEffect(() => {
    if (api === null) {
      const getApi = async () => {
        const { data } = await ApiKeys.mapsApi();
        setApi(data);
      };
      getApi();
    }
  }, []);

  const markerClick = (marker) => {
    navigate(marker.cragName);
  };

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
    <LoadScript googleMapsApiKey={api === "dev" ? "" : api}>
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
