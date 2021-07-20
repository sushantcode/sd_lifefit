import React from 'react';
import Statefarm from "./state_farm.jpeg";
import "./About.css";

const About = () => {
  return (
    <div>
   {/*  <!-- Loader */}
    <div id="loader-wrapper">
        <div id="loader"/>
        <div class="loader-section section-left"/>
        <div class="loader-section section-right"/>
    </div> 
    <div class="container">
        <section class="tm-section-head" id="top">
            <header id="header" class="text-center tm-text-gray">
                <h1>
                  ABOUT LIFEFIT 
                </h1>
                <hr class="describe"/>
                <p1 class='describe'>
                  An innovative and unique way to track your health and fitness status to get better rate on your life insurance with StateFarm!!!
                </p1>
                <hr/>
                <p2>
                This is the senior design project named <span className="sponsor">LifeFit sponsored by "State Farm Insurance Company" and UTA-CSE department,</span>  
                and supervised by Prof. Chris Conly.
                </p2>
                <hr/>
            </header>
           


        </section>

        <section class="row">
            <div class="col text-center">
              <img src={Statefarm} alt="Image" style={{maxWidth: 400}}/>
            </div>
        </section>
        <hr/>

        <div class="description text-center mb-5">
          <p>
          Being a good neighbor is about more than just being there when things go completely wrong.
          It's also about being there for all of life's moments when things go perfectly right.
              </p>
            <p>
            With a passion for serving customers and giving back in our communities, 
            we've been doing well by doing good for almost 100 years. 
            And we're happy you decided to get to know us better.
          </p>
          <hr/>
          <hr/>
          <p>
          The <span className="version"> first tag (version 2.0)</span>first tag (version 2.0) had been inherited from the<span className="previous_team">Teams Aero</span>  who previously worked on this project. 
          Any tag after that will be the team<span className="team_name"> SpaceTabs</span>  work on the inherited project.
          </p>
        </div>
    </div>
  </div>
  )
}

export default About
