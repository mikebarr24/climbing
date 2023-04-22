import { HashLink } from "react-router-hash-link";
import { IoMdNotifications } from "react-icons/io";
import { SlArrowUp } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Nav.scss";
import getNotifications from "../../api/notifications";
import Notification from "./Notification";
import crags from "../../api/crags";
const logo = require("../../media/images/climbing-logo-main-white.png");

function Nav({ user }) {
  const [menu, setMenu] = useState(false);
  const [notificationsMenu, setNotificationsMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const menuView = () => {
    setMenu(!menu);
  };

  const removeNotification = async (notificationId, userId) => {
    const { data } = await crags.removeNotification(notificationId, userId);
    setNotifications(data);
  };

  useEffect(() => {
    const getNot = async () => {
      const { data } = await getNotifications();
      setNotifications(data.notifications);
    };
    getNot();
  }, [notificationsMenu]);

  const notificationHandel = (notification) => {
    navigate(`crags/${notification.parent}`);
    setNotificationsMenu(!notificationsMenu);
  };
  let displayedNotifications = [];
  if (notifications) {
    displayedNotifications = notifications.map((notification, index) => {
      return (
        <li key={index} className="nav--notification-item">
          <Notification
            notification={notification}
            onClick={notificationHandel}
            user={user}
            removeNotification={removeNotification}
          />
        </li>
      );
    });
  }

  return (
    <nav id="nav">
      <span
        className="nav--notification-icon"
        onClick={() => setNotificationsMenu(!notificationsMenu)}
      >
        <IoMdNotifications />
      </span>
      <HashLink smooth to="/#home" className="logo">
        <img src={logo} alt="climbing logo" className="logo" />
      </HashLink>
      <div className={!menu ? "nav-menu" : "nav-menu open"}>
        <ul>
          <HashLink smooth to="/#home" onClick={menuView}>
            <li className="nav-item">Home</li>
          </HashLink>
          <HashLink smooth to="/#about" onClick={menuView}>
            <li className="nav-item">About</li>
          </HashLink>
          <Link to="/crags">
            <li className="nav-item" onClick={menuView}>
              Crags
            </li>
          </Link>
          <Link to="/contact">
            <li className="nav-item" onClick={menuView}>
              Contact
            </li>
          </Link>
          {!user && (
            <Link to="/login">
              <li className="nav-item" onClick={menuView}>
                Login
              </li>
            </Link>
          )}
          {user && (
            <Link to={`/account/${user.name.toLowerCase()}`}>
              <li className="nav-item" onClick={menuView}>
                Account
              </li>
            </Link>
          )}
          {user && (
            <Link to={"/logout"}>
              <li className="nav-item" onClick={menuView}>
                Logout
              </li>
            </Link>
          )}
        </ul>
      </div>
      <div
        className={`nav--notifications container ${
          notificationsMenu && "open"
        }`}
      >
        <ul className="nav--notification-list-wrapper">
          {displayedNotifications.length > 0 ? (
            displayedNotifications.slice(0, 6).reverse()
          ) : (
            <h2 className="nav--notification-no-notifications">
              No Notifications
            </h2>
          )}
        </ul>
        <div
          className="nav--notification-close"
          onClick={() => setNotificationsMenu(!notificationsMenu)}
        >
          <SlArrowUp />
        </div>
      </div>
      <div className="burger-button" onClick={menuView}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Nav;
