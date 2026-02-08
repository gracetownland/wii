import './App.css';
import LandingPage from './LandingPage';
import AboutMe from './AboutMe';
import ContactPage from './ContactPage';
import Valentine from './valentine';
import Valentine2 from './valentine2';
import MoviePage from './MoviePage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin imports
import { ContentProvider } from './contexts/ContentContext';
import { AuthProvider } from './admin/AuthContext';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedRoute from './admin/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ContentProvider>
            <Routes>
              {/* Default Route */}
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

              {/* Valentine Route */}
              <Route path="/valentine" element={<Valentine />} />

              {/* Valentine2 Route */}
              <Route path="/valentine2" element={<Valentine2 />} />
              <Route path="/movies" element={<MoviePage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ContentProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;