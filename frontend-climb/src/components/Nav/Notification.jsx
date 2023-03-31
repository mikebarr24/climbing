import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Notification.scss";

function Notification({ notification, onClick, user, removeNotification }) {
  let color;
  switch (notification.type) {
    case "route":
      color = "#6FADEA";
      break;
    case "sector":
      color = "#EAAC6F";
      break;
    case "crag":
      color = "#EA6FAD";
      break;
    default:
      color = "000";
  }
  const COLOUR = {
    borderRightColor: color,
    borderBottomColor: color,
  };

  return (
    <div className="notification-wrapper">
      <p className="notification-type" style={COLOUR}>
        {notification.type.toUpperCase()}
      </p>
      <div
        className="notification-text-wrapper"
        onClick={() => onClick(notification)}
      >
        <h3 className="notification-title">{notification.title}</h3>
      </div>
      <span
        className="notification-remove"
        onClick={() => removeNotification(notification._id, user._id)}
      >
        <AiFillCloseCircle />
      </span>
    </div>
  );
}

export default Notification;
