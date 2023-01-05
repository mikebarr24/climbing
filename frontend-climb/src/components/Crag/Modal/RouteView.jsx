import "./RouteView.scss";
import React from "react";
import BackArrow from "../../common/BackArrow";
import { AiFillStar } from "react-icons/ai";

function RouteView({ routeInfo, close }) {
  const starRating = [...Array(routeInfo.routeRating).keys()].map(
    (_, index) => {
      return <AiFillStar key={index} />;
    }
  );
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
