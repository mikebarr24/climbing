import React from "react";
import Button from "../Button/Button";
import "./About.scss";

function About() {
  return (
    <div id="about" className="container">
      <h2 className="title-text">About my Project</h2>
      <p className="standard-text">
        This is a project I've just set up for the climbing community in
        Norhtern Ireland. I'd like to create a community specifically for our
        wee country to meet and share online.
        <br />
        <br />
        If there are any features you would like to see implimented, please
        reach out and I'll do my best to get it up and running.
        <br />
        <br />
        Cheers everyone!
        <br />
        Michael
      </p>
      <div className="btn-wrapper">
        <Button name="Contact Me" className="about-btn" />
        <Button name="Learn More" className="about-btn" />
      </div>
    </div>
  );
}

export default About;
