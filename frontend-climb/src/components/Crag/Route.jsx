import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./Route.scss";

function Route({ routeName, routeGrade, routeRating }) {
  const starRating = [...Array(routeRating).keys()].map((item) => {
    console.log(routeRating);
    return <AiFillStar key={item} />;
  });
  return (
    <div className="route">
      <p className="route--route-name">{routeName}</p>
      <p className="route--route-grade">{routeGrade}</p>
      <span className="route--route-rating">{starRating}</span>
    </div>
  );
}

export default Route;
