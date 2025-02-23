import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Map from './pages/Map';
import About from './pages/About';
import DashboardLayoutBasic from './layouts/Dashboard';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DashboardLayoutBasic />}>
        <Route path="home" element={<Home />} />
        <Route path="weather" element={<Weather />} />
        <Route path="map" element={<Map />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;