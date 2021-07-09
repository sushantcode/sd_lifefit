import React from "react";
import "./Welcome.css";
import Image from "./StateFarmFit.png";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome__description">
        <h2 className="welcome__description__header">
          Introducing <span className="state__farm">State Farm</span> Fit
        </h2>
        <p className="welcome__description__paragraph">
          State Farm's first health and fitness tracking app.
        </p>
        <p className="welcome__description__paragraph">
          Track your health and fitness to potentially receive a discounted life
          insurance rate!
        </p>
      </div>
      <img className="welcome__description__image" src={Image} />
    </div>
  );
};

export default Welcome;