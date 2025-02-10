import React from 'react';
import './AboutMe.css'; // Create this CSS file for specific styling
import aboutMe from './img/aboutMe.JPG';
import portfolio from './img/portfolio.jpg';

function AboutMe() {
  return (
    <div id="AboutMe" className="AboutMe">
      <div className="leftSide">
        <div className="text">
          <h2 className="heading">Get to</h2>
          <div className="hoverContainer">
            <h2 className="heading">know </h2>
            <span className="MynameContainer">
              <h2 className="Myname"> Siya</h2>
              <span className="duckling"> 🐣</span>
            </span>
          </div>
        </div>
        <div className="leftImage">
          <img src={aboutMe} alt="pretty siya smiling" />
        </div>
      </div>
      <div className="rightSide">
        <div>
          <img src={portfolio} alt="pretty siya smiling" />
          <p className="bodyText">
            I am an Alumnus of UBC and the owner of Tiny Mango Shop, where I
            sell handmade jewellery and crocheted items. I love Kathak,
            Khalid, Coldplay and momos.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;