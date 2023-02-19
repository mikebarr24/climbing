import { HashLink } from "react-router-hash-link";
import { IoMdNotifications } from "react-icons/io";
import { SlArrowUp } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Nav.scss";
import getNotifications from "../../api/notifications";
import Notification from "./Notification";
const logo = require("../../media/images/climbing-logo-main-white.png");

function Nav({ user }) {
  const [menu, setMenu] = useState(false);
  const [notificationsMenu, setNotificationsMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const menuView = () => {
    setMenu(!menu);
  };

  const notificationsView = () => {
    setNotificationsMenu(!notificationsMenu);
  };

  useEffect(() => {
    const getNot = async () => {
      const { data } = await getNotifications();
      setNotifications(data.notifications);
    };
    getNot();
  }, [notificationsMenu]);

  const notificationHandel = (notification) => {
    console.log(notification);
    navigate(`crags/${notification.parent}`);
    setNotificationsMenu(!notificationsMenu);
  };

  const displayedNotifications = notifications.map((notification, index) => {
    return (
      <li key={index} className="nav--notification-item">
        <Notification
          notification={notification}
          onClick={notificationHandel}
          user={user}
          setNotifications={setNotifications}
        />
      </li>
    );
  });

  return (
    <nav id="nav">
      <span className="nav--notification-icon" onClick={notificationsView}>
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
            displayedNotifications.slice(0, 6)
          ) : (
            <h2>No notifications</h2>
          )}
        </ul>
        <div className="nav--notification-close" onClick={notificationsView}>
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
