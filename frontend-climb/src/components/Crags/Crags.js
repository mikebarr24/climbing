import "./Crags.scss";
import Map from "./Map";

import React from "react";

function Crags() {
  return (
    <div id="crags" className="container">
      <h2 className="page-title">Crags</h2>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
}

export default Crags;
