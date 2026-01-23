import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="NavBar">
      <a href="https://www.instagram.com/tinymangoshop/" className="nava" target="_blank" rel="noopener noreferrer">
        Tiny Mango
      </a>
      <a href="https://moonlitmirage.home.blog/" className="nava" target="_blank" rel="noopener noreferrer">
        Moonlit Mirage
      </a>
      <a href="#AboutMe" className="nava">
        About Me
      </a>
      <a href="#ReachOut" className="nava">
        Reach Out
      </a>
    </nav>
  );
}

export default NavBar;