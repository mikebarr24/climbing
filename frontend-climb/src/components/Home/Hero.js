import React from "react";
import "./Hero.scss";
const logo = require("../../media/images/climbing-ni-logo.png");

function Hero() {
  return (
    <div id="hero">
      <img src={logo} alt="climbingNI logo" className="hero-logo" />
      <h2 className="subheading">Everything Climb in Northern Ireland</h2>
    </div>
  );
}

export default Hero;
