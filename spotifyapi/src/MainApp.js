import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';

function MainApp() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/notfound" element={<NotFound />} /> {/* Correct route for NotFound */}
        </Routes>
      </Router>
    );
  }
  
  export default MainApp;