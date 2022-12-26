import "./RouteView.scss";
import React from "react";
import BackArrow from "../../common/BackArrow";

function RouteView({ routeInfo, close }) {
  return (
    <div className="route-view container">
      <div className="route-view--title-bar">
        <BackArrow onClick={close} className="route-view--back-arrow" />
        <h2>{routeInfo.routeName}</h2>
      </div>
      <p>Grade: {routeInfo.routeGrade}</p>
      <p>Rating: {routeInfo.routeRating}</p>
    </div>
  );
}

export default RouteView;
