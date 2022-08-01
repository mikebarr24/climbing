import React from "react";
import "./Hero.scss";
const logo = require("../../media/images/climbing-ni-logo.png");

function Hero() {
  return (
    <div id="hero">
      <div className="hero-wrapper">
        <img src={logo} alt="climbingNI logo" className="hero-logo" />
        <h1 className="hero-text">
          <span className="hero-subheading">All things</span>
          <span className="hero-heading">Climbing NI</span>
        </h1>
      </div>
    </div>
  );
}

export default Hero;
