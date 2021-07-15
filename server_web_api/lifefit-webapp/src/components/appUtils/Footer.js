import React from "react";
import "./Footer.css";
import facebook from "./facebook.png";
import github from "./github.png";
import youtube from "./youtube.png";
import linkedin from "./linkedin.png";
import Android from "./android.png";

const Footer = () => {
  return (
    <>
      <div className="footer shadow-lg rounded mt-auto">
        <div className="app__promotion">
          Available on:
          <img className="andriod__logo" src={Android} alt="androiddLogo" />
        </div>

        <div className="footer__socials">
          <div className="social__mediaIcon">
            <a href="https://www.facebook.com/statefarm/" target="_blank">
              <img
                className="footer__social__icon"
                src={facebook}
                alt="facebook"
              />
            </a>
            <a href="https://www.linkedin.com/company/state_farm/" target="_blank">
              <img
                className="footer__social__icon"
                src={linkedin}
                alt="linkedin"
              />
            </a>
            <a href="https://github.com/StateFarmIns" target="_blank">
              <img className="footer__social__icon" src={github} alt="github" />
            </a>
            <a href="https://www.youtube.com/statefarm" target="_blank">
              <img
                className="footer__social__icon"
                src={youtube}
                alt="youtube"
              />
            </a>
          </div>
          <div className="footer_descriptions">Copyright 2021 &copy; Team-SpaceTabs | Terms of use | Policies </div>
        </div>

        <p>"Like a good neighbour,State Farm is there."</p>
      </div>
    </>
  )
}

export default Footer;
