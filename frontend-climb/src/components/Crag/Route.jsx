import React from "react";
import "./Route.scss";

function Route({ routeName, routeGrade }) {
  return (
    <div className="route">
      <p className="route--route-name">{routeName}</p>
      <p className="route--route-grade">{routeGrade}</p>
      <p className="route--route-stars">x x x</p>
    </div>
  );
}

export default Route;
