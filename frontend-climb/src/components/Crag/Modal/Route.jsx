import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./Route.scss";

function Route({ routeName, routeGrade, routeRating, onClick }) {
  const starRating = [...Array(routeRating).keys()].map((item) => {
    return <AiFillStar key={item} />;
  });
  return (
    <div className="route" onClick={onClick}>
      <p className="route--route-name">{routeName}</p>
      <p className="route--route-grade">{routeGrade}</p>
      <span className="route--route-rating">{starRating}</span>
    </div>
  );
}

export default Route;
