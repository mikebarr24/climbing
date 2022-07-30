import React from "react";
import "./Home.scss";
const logo = require("../../media/images/climbing-ni-logo.png");

function Home() {
  return (
    <div id="home">
      <img src={logo} alt="climbingNI logo" className="home-logo" />
      <h2 className="subheading">Everything Climb in Northern Ireland</h2>
    </div>
  );
}

export default Home;
