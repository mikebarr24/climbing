import "./RouteView.scss";
import React from "react";
import BackArrow from "../../common/BackArrow";

function RouteView({ routeInfo, close }) {
  return (
    <div className="route-view">
      <div className="route-view--title-bar">
        <BackArrow onClick={close} className="route-view--back-arrow" />
        <h2>{routeInfo.routeName}</h2>
      </div>
      <div className="route-view--body container standard-text">
        <p>
          <strong>Grade</strong>: {routeInfo.routeGrade}
        </p>
        <p>
          <strong>Rating</strong>: {routeInfo.routeRating}
        </p>
        <p>
          Description: <br /> {routeInfo.routeDescription}
        </p>
      </div>
    </div>
  );
}

export default RouteView;
