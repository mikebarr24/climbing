import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
const logo = require("../../media/images/climbing-ni-logo.png");

function Nav(props) {
  const [menu, setMenu] = React.useState(false);

  const menuView = () => {
    setMenu(!menu);
  };

  return (
    <nav id="nav">
      <h1>ClimbingNI</h1>
      <div className={!menu ? "nav-menu" : "nav-menu open"}>
        <ul>
          <Link to="">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="">
            <li className="nav-item">About</li>
          </Link>
          <Link to="">
            <li className="nav-item">Crags</li>
          </Link>
          <Link to="">
            <li className="nav-item">Contact</li>
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
