import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import img1 from "./1.png";
import img1_1 from "./1_1.png";
import img2 from "./2.png";

const Dashboard = () => {
  
  
  return (
    <div className="container">
      <div className="row shadow-lg p-3 mb-2 bg-body rounded">
        <div className="col-6">
          <img src={img1} className="rounded float-end" alt="Score Circle" style={{maxWidth: 500}} />
          Circular image for score
        </div>
        <div className="col-6">
        <img src={img1_1} className="rounded float-end" alt="Score Feed back" style={{maxWidth: 500}} />
          Feedback about score
        </div>
      </div>
      <div className="row shadow mb-5 bg-body rounded">
        <div className="col text-center">
        <img src={img2} className="rounded float-center" alt="Categories Summary" style={{maxWidth: 1100}} />
        </div>
      </div>
      <div className="row shadow-sm p-3 mb-5 bg-body rounded">
        <div className="col">
          Graphical representation of Steps
        </div>
      </div>
      <div className="row shadow-sm p-3 mb-5 bg-body rounded">
        <div className="col">
          Graphical representation of Calories
        </div>
      </div>
      <div className="row shadow-sm p-3 mb-5 bg-body rounded">
        <div className="col">
          Graphical representation of Heart rate
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
