import "./Crags.scss";
import Map from "../Map";
import { useState, useEffect } from "react";
import ApiKeys from "../../api/ApiKeys";

function Crags({ user }) {
  const [api, setApi] = useState(null);

  //Set Google Map Api
  useEffect(() => {
    const getApi = async () => {
      const { data } = await ApiKeys.mapsApi();
      setApi(data);
    };
    getApi();
  }, []);

  return (
    <div id="crags" className="container">
      <h2 className="page-title">Crags</h2>
      {user && <p className="standard-text">Hold the map to add a new crag</p>}
      <div>
        <Map user={user} api={api} />
      </div>
    </div>
  );
}

export default Crags;
