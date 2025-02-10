import './App.css';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutMe from './AboutMe';
import ContactPage from './ContactPage';
import QuotePage from './QuotePage';

function App() {
  return (
    <div className="App">
      <LandingPage />
      <AboutMe />
      <ContactPage />
    </div>
  );
}

export default App;

