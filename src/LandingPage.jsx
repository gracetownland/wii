import React from 'react';
import './LandingPage.css';
import videoBackground from './img/SiyaDwi.mov';
import NavBar from './NavBar';

function LandingPage() {
  return (
    <div className="backgroundContainer">
      <video autoPlay loop muted className="backgroundVideo">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag. rip.
      </video>
      <div className="LandingPage">
        <header className="LandingPage-header">
          <h1>
            <a href="/valentine" className="siya-link">SIYA</a>  {/* Standard anchor tag */}
            <br />
            DWIVEDI
          </h1>
        </header>
        <div className="LandingPage-body">
          <p>Welcome to my corner of the internet :)</p>
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default LandingPage;