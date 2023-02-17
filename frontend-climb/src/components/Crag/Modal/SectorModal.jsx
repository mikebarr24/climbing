import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import "./SectorModal.scss";
import Button from "../../Button/Button";
import CloseButton from "../../common/CloseButton";
import AddRouteForm from "./AddRouteForm";
import Route from "./Route";
import crags from "../../../api/crags";
import RouteView from "./RouteView";
import ArchiveButton from "../../common/ArchiveButton";

function SectorModal({ user }) {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [openRouteView, setOpenRouteView] = useState(false);
  const [sector, setSector] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const routeInfo = useRef();
  const OVERLAY = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  };
  const { cragName, sectorName } = useParams();
  useEffect(() => {
    const local = async () => {
      const { data } = await crags.getCrag(cragName);
      const [currentSector] = data.sectors.filter(
        (item) => item.sectorName === sectorName
      );
      setSector(currentSector);
    };
    local();
  }, [cragName, sectorName]);

  const archiveSector = async () => {
    await crags.archiveSector(cragName, sectorName);
    navigate(`/crags/${cragName}`);
  };

  const handleRouteClick = (route) => {
    setOpenRouteView(!openRouteView);
    routeInfo.current = route;
  };

  const handleCloseRouteAdd = () => {
    setOpenForm(!openForm);
    setTrigger(!trigger);
  };

  document.body.style.overflowY = "hidden";

  let routeList;
  if (sector) {
    routeList = sector.routes.map((route, index) => {
      if (!route.archived) {
        return (
          <Route
            key={index}
            routeName={route.routeName}
            routeGrade={route.routeGrade}
            routeRating={route.routeRating}
            onClick={() => handleRouteClick(route)}
          />
        );
      } else {
        return null;
      }
    });
  }
  if (!sector) return <h1>Loading...</h1>;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY} />
      <div className="crag-modal standard-text container">
        <div className="modal--title-bar">
          {<h2>{sector.sectorName}</h2>}
          {user?.isAdmin && <ArchiveButton onClick={archiveSector} />}
          <CloseButton onClick={() => navigate(`/crags/${cragName}`)} />
        </div>
        <div className="crag-modal--body">
          <div className="sector-photo">Photo of Sector here</div>
          <h3>Sector Info</h3>
          {<p>{sector.information}</p>}
          <div className="sector--route-container">
            <div className="crag--route-header">
              <h3>Routes</h3>
              <Button onClick={() => setOpenForm(!openForm)}>
                Add New Route
              </Button>
            </div>
            <div className="sector--route-list-wrapper">
              <div className="sector--route-title-wrapper">
                <p className="sector--route-title">Route Name</p>
                <p className="sector--route-title">Grade</p>
                <p className="sector--route-title right">Rating</p>
              </div>
              {sector && sector.routes.length === 0
                ? "No routes at this crag"
                : routeList}
            </div>
          </div>
        </div>

        {openForm && (
          <AddRouteForm
            close={handleCloseRouteAdd}
            windowState={openForm}
            currentCrag={cragName}
            currentSector={sectorName}
            setSector={setSector}
          />
        )}
        {openRouteView && (
          <RouteView
            routeInfo={routeInfo.current}
            close={() => setOpenRouteView(false)}
            setSector={setSector}
          />
        )}
      </div>
    </>,

    document.getElementById("portal")
  );
}

export default SectorModal;
