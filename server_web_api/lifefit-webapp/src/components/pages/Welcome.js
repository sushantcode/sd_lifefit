import React from "react";
import "./Welcome.css";
import Image from "./StateFarmFit.png";

const Welcome = () => {
  return (
    <div className="welcome pb-5 pt-4">
      <div className="welcome__description d-flex justify-content-center">
        <h2 className="welcome__description__header">
          <span className="text-danger">Introducing State Farm Fit</span>
        </h2>
        <p className="welcome__description__paragraph">
          State Farm's first health and fitness tracking app.
        </p>
        <p className="welcome__description__paragraph">
          Track your health and fitness to potentially receive a discounted health and life
          insurance rate!
        </p>
      </div>
      <img className="welcome__description__image" src={Image} />
    </div>
  );
};

export default Welcome;