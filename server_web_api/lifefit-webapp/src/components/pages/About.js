import React from 'react';
import Statefarm from "./state_farm.jpeg";

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
            </header>
            <hr/>
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
        </div>
    </div>
  </div>
  )
}

export default About
