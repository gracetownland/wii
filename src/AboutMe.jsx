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
      <h2 className = "heading">Get to know</h2>
      <h2 className="Myname">Siya</h2>
        </div>
 <div className='leftImage'>
      <img src={aboutMe} alt="pretty siya smiling" />
    </div>
      </div>
      <div className = "rightSide">
        <div>
      <img src={portfolio} alt="pretty siya smiling" />
    </div>
      <p className='bodyText'>Siya is an UBC Alumnus and the owner of Tiny Mango Shop, where she sells handmade jewellery and crocheted items. She loves Kathak, Khalid, Coldplay and momos.</p>
      </div>
    </div>
  );
}

export default AboutMe;