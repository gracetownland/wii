import React from 'react';
import './LandingPage.css'; // Create this CSS file for specific styling
import videoBackground from './img/SiyaDwi.mov';
import NavBar from './NavBar';

function LandingPage() {
  return (
    <div className="backgroundContainer">
      <video autoPlay loop muted className="backgroundVideo">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="LandingPage">
        <header className="LandingPage-header">
          <h1>SIYA<br /> DWIVEDI</h1>
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