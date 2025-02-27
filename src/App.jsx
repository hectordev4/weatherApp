import React from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import NavBar from './layouts/Navbar';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Map from './pages/Map';
import About from './pages/About';
import NoPage from './pages/NoPage';
// import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <>
    {/* <ErrorBoundary> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    {/* </ErrorBoundary> */}
    </>
  );
}

