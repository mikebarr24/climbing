import React from "react";
import "./Home.scss";
import Hero from "./Hero";
import About from "./About";

function Home() {
  return (
    <div id="home">
      <Hero />
      <About />
    </div>
  );
}

export default Home;
