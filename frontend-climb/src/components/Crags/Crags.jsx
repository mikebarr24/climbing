import "./Crags.scss";
import { useEffect, useState, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import ApiKeys from "../../api/ApiKeys";
import Map from "./Map";

function Crags() {
  const [api, setApi] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: api,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div id="crags" className="container">
      <h2 className="page-title">Crags</h2>
      <div>
        <Map />
      </div>
    </div>
  );
}

export default Crags;
