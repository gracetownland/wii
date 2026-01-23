import React from 'react';
import './AboutMe.css';
import aboutMeImg from './img/aboutMe.JPG';
import portfolioImg from './img/portfolio.jpg';
import { useContent } from './contexts/ContentContext';

function AboutMe() {
  const { content, loading } = useContent();
  const about = content.about || {};

  // Default text if nothing in database
  const defaultBio = "I am an Alumnus of UBC and the owner of Tiny Mango Shop, where I sell handmade jewellery and crocheted items. I love Kathak, Khalid, Coldplay and momos.";

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
          <img src={aboutMeImg} alt="pretty siya smiling" />
        </div>
      </div>
      <div className="rightSide">
        <div>
          {/* Use dynamic image if uploaded, else default */}
          <img src={about.imageUrl || portfolioImg} alt="pretty siya smiling" />
          <p className="bodyText">
            {loading ? '...' : (about.bio || defaultBio)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;