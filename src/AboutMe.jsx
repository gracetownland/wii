import React from 'react';
import './AboutMe.css'; // Create this CSS file for specific styling
import portfolio from './img/portfolio.jpg'
import portfolio1 from './img/portfolio1.png'
function AboutMe() {
  return (
    <div id="AboutMe" className="AboutMe">
      <div className = "leftSide">
      <h2 className = "heading">Get to Know </h2>
      <h2 className="name">Siya</h2>
      </div>
      <div className = "rightSide">
      <p>Siya is an UBC Alumnus and the owner of Tiny Mango Shop, where she sells handmade jewellery and crocheted items. She loves Kathak, Khalid, Coldplay and momos.</p>
      </div>
    </div>
  );
}

export default AboutMe;