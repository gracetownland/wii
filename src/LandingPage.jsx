import React from 'react';
import './LandingPage.css'; // Create this CSS file for specific styling
import background from './img/SiyaDwivedi.png'
import NavBar from './NavBar'
function LandingPage() {
  return (
    <div className='backgroundImage' style={{backgroundImage: `url(${background})`}}>
    <div className="LandingPage">
      <header className="LandingPage-header">
        <h1>SIYA<br></br> DWIVEDI</h1>
      </header>
      <div className='LandingPage-body'>
        <p>Welcome to my corner of the internet :)</p>
      </div>
    </div>
    <NavBar/>
    </div>
  );
}

export default LandingPage;