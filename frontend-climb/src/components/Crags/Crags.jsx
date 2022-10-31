import "./Crags.scss";
import Map from "../Map";
import auth from "../../api/auth";
import { useState, useEffect } from "react";
import ApiKeys from "../../api/ApiKeys";
import crags from "../../api/crags";

function Crags() {
  const [user, setUser] = useState(null);
  const [allCrags, setAllCrags] = useState([]);
  const [api, setApi] = useState(null);

  //Set Current User
  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  //Set Google Map Api
  useEffect(() => {
    const getApi = async () => {
      const { data } = await ApiKeys.mapsApi();
      setApi(data);
    };
    getApi();
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

  return (
    <div id="crags" className="container">
      <h2 className="page-title">Crags</h2>
      {user && <p className="standard-text">Hold the map to add a new crag</p>}
      {/* <LoadScript googleMapsApiKey={api === "dev" ? "" : api}> */}
      <div>
        <Map crags={allCrags} user={user} api={api} />
      </div>
      {/* </LoadScript> */}
    </div>
  );
}

export default Crags;
