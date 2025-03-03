import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import NavBar from './layouts/Navbar';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Map from './pages/Map';
import About from './pages/About';
import NoPage from './pages/NoPage';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/ThemeProvider'; // Import the theme objects

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system theme preference on mount
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* This ensures the global styles are applied */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;


// // import ErrorBoundary from './components/ErrorBoundary';

// export default function App() {
//   return (
//     <>
//     {/* <ErrorBoundary> */}
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/weather" element={<Weather />} />
//         <Route path="/map" element={<Map />} />
//         <Route path="/about" element={<About />} />
//         <Route path="*" element={<NoPage />} />
//       </Routes>
//     {/* </ErrorBoundary> */}
//     </>
//   );
// }

