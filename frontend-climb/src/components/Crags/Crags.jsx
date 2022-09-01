import "./Crags.scss";
import Map from "./Map";
import Auth from "../../api/Auth";
import { useState, useEffect } from "react";

function Crags() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(Auth.getCurrentUser());
  }, []);
  return (
    <div id="crags" className="container">
      <h2 className="page-title">Crags</h2>
      {user && <p className="standard-text">Hold the map to add a new crag</p>}
      <div>
        <Map />
      </div>
    </div>
  );
}

export default Crags;
