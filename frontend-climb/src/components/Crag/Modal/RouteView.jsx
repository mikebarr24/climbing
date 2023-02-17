import "./RouteView.scss";
import React from "react";
import { useParams } from "react-router-dom";
import BackArrow from "../../common/BackArrow";
import { AiFillStar } from "react-icons/ai";
import ArchiveButton from "../../common/ArchiveButton";
import crags from "../../../api/crags";

function RouteView({ routeInfo, close, setSector }) {
  const { cragName, sectorName } = useParams();
  const starRating = [...Array(routeInfo.routeRating).keys()].map(
    (_, index) => {
      return <AiFillStar key={index} />;
    }
  );

  const archiveHandle = async () => {
    const { data } = await crags.archiveRoute(
      routeInfo.routeName,
      sectorName,
      cragName
    );
    setSector(data);
    close();
  };
  return (
    <div className="route-view">
      <div className="modal--title-bar">
        <BackArrow onClick={close} />
        <h2>{routeInfo.routeName}</h2>
        <ArchiveButton onClick={archiveHandle} />
      </div>
      <div className="route-view--grade-rating">
        <p>
          <strong>Grade</strong>: {routeInfo.routeGrade}
        </p>
        <p className="route-view--stars">
          <strong>Rating</strong>: {starRating}
        </p>
      </div>
      <div className="route-view--body container standard-text">
        <p>
          <strong>Description</strong>: <br /> {routeInfo.routeDescription}
        </p>
      </div>
    </div>
  );
}

export default RouteView;
