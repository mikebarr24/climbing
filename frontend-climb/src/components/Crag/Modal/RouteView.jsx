import "./RouteView.scss";
import React from "react";
import BackArrow from "../../common/BackArrow";

function RouteView({ routeInfo, close }) {
  return (
    <div className="route-view">
      <div className="modal--title-bar">
        <BackArrow onClick={close} />
        <h2>{routeInfo.routeName}</h2>
      </div>
      <div className="route-view--grade-rating">
        <p>
          <strong>Grade</strong>: {routeInfo.routeGrade}
        </p>
        <p>
          <strong>Rating</strong>: {routeInfo.routeRating}
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
