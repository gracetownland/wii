import React from 'react';
import './AboutMe.css'; // Create this CSS file for specific styling
import aboutMe from './img/aboutMe.JPG'
import portfolio from './img/portfolio.jpg'
import portfolio1 from './img/portfolio1.png'
function AboutMe() {
  return (
    <div id="AboutMe" className="AboutMe">
      <div className = "leftSide">
        <div className='text'>
      <h2 className = "heading">Get to</h2>
      <span>
      <h2 className = "heading">know</h2>
      <h2 className="Myname">Siya</h2>
      </span>
        </div>
 <div className='leftImage'>
      <img src={aboutMe} alt="pretty siya smiling" />
    </div>
      </div>
      <div className = "rightSide">
        <div className=''>
      <img src={portfolio} alt="pretty siya smiling" />
      <p className='bodyText'>Siya is an UBC Alumnus and the owner of Tiny Mango Shop, where she sells handmade jewellery and crocheted items. She loves Kathak, Khalid, Coldplay and momos.</p>
    </div>
      </div>
    </div>
  );
}

export default AboutMe;