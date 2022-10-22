import React from "react";
import "./Route.scss";

function Route({ routeName, routeGrade, routeRating }) {
  return (
    <div className="route">
      <p className="route--route-name">{routeName}</p>
      <p className="route--route-grade">{routeGrade}</p>
      <p className="route--route-rating">{routeRating}</p>
    </div>
  );
}

export default Route;
