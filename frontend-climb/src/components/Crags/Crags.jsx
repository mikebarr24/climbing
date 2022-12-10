import "./Crags.scss";
import Map from "../Map";

function Crags({ user, api }) {
  console.log(api);
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
