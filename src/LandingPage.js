import React from 'react';
import './LandingPage.css'; // Create this CSS file for specific styling
import background from './img/SiyaDwivedi.png'
function LandingPage() {
  return (
    <div className="LandingPage" style={{backgroundImage: `url(${background})`}}>
      </div>
      <div>
      <header className="LandingPage-header">
        <h1>Welcome to the Landing Page</h1>
        <p>This is the landing page of your application.</p>
      </header>
    </div>
  );
}

export default LandingPage;