import React, { useEffect } from 'react';
import './NavBar.css';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

function NavBar() {
  useEffect(() => {
    const links = document.querySelectorAll('.nava');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        if (targetId.startsWith('#')) {
          gsap.to(window, { duration: 2.5, scrollTo: targetId });
        } else {
          window.location.href = targetId;
        }
      });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <nav className="NavBar">
      <a href="https://www.instagram.com/tinymangoshop/" className="nava">
        Tiny Mango
      </a>
      <a href="https://moonlitmirage.home.blog/" className="nava">
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