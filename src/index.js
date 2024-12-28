import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const root = ReactDOM.createRoot(document.getElementById('root'));

function Root() {
  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      const scrollAmount = window.innerHeight * direction; // Scroll by the height of the viewport
      gsap.to(window, { scrollTo: { y: window.scrollY + scrollAmount, autoKill: false }, duration: 2.0, ease: "power1.inOut" });
    };

window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
window.removeEventListener('wheel', handleScroll, { passive: false });    };
  }, []);

  return <App />;
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();