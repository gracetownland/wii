import './App.css';
import LandingPage from './LandingPage';
import AboutMe from './AboutMe';
import ContactPage from './ContactPage';
import Valentine from './valentine';  // ✅ Import the Valentine component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* ✅ Default Route */}
          <Route
            path="/"
            element={
              <>
                <LandingPage />
                <AboutMe />
                <ContactPage />
              </>
            }
          />

          {/* ✅ Valentine Route */}
          <Route path="/valentine" element={<Valentine />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;