import './App.css';
import LandingPage from './LandingPage';
import AboutMe from './AboutMe';
import ContactPage from './ContactPage';
import QuotePage from './QuotePage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
   const handleScroll = (event) => {
  event.preventDefault();
  const direction = event.deltaY > 0 ? 1 : -1;
  const scrollAmount = (window.innerHeight * direction);
  gsap.to(window, { scrollTo: { y: window.scrollY + scrollAmount, autoKill: false }, duration: 1.5, ease: "power2.inOut" });
};

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <LandingPage />
      <AboutMe />
      <QuotePage />
      <ContactPage />
    </div>
  );
}

export default App;