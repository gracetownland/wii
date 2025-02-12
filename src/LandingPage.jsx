import React from 'react';
import './LandingPage.css';
import videoBackground from './img/SiyaDwi.mov';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';  

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
            <Link to="/valentine" className="siya-link">SIYA</Link>  {/* ✅ Use Link instead of <a> */}
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