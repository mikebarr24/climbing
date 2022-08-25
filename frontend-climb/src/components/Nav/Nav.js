import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const mainLogo = require("../../media/images/climbing-logo-main-white.png");

function Nav(props) {
  const [menu, setMenu] = React.useState(false);
  console.log(props.user);
  const menuView = () => {
    setMenu(!menu);
  };

  return (
    <nav id="nav">
      <Link to="/">
        <img src={mainLogo} alt="Main Logo" className="main-logo" />
      </Link>
      <div className={!menu ? "nav-menu" : "nav-menu open"}>
        <ul>
          <Link to="/">
            <li className="nav-item" onClick={menuView}>
              Home
            </li>
          </Link>
          <HashLink smooth to="#about" onClick={menuView}>
            <li className="nav-item">About</li>
          </HashLink>
          <Link to="#">
            <li className="nav-item">Crags</li>
          </Link>
          <Link to="#">
            <li className="nav-item">Contact</li>
          </Link>
          <Link to="/login">
            <li className="nav-item" onClick={menuView}>
              Login
            </li>
          </Link>
        </ul>
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
