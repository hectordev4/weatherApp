import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { FaTree, FaBook, FaGamepad, FaSun, FaCloud, FaSnowflake } from "react-icons/fa";
import { motion } from "framer-motion";
import '../styles/Home.css'; // Import the CSS file

export default function HomePage() {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-section"
      >
        <h1 className="hero-title">Weather-Themed Fun</h1>
        <p className="hero-subtitle">Explore activities based on today's weather!</p>
        <WeatherTheme />
        <Button variant="contained" color="primary" className="explore-btn">Explore Now</Button>
      </motion.div>

      {/* Activities Section */}
      <div className="activities-section">
        <ActivityCard icon={<FaTree size={40} />} title="Outdoor Adventures" description="Explore nature and parks, perfect for sunny days!" />
        <ActivityCard icon={<FaBook size={40} />} title="Cozy Reading" description="Perfect for cloudy days with a warm cup of tea." />
        <ActivityCard icon={<FaGamepad size={40} />} title="Game Night" description="Play indoor games, ideal for snowy days." />
      </div>

      {/* Footer */}
      <footer className="footer">Made with love for all weather lovers</footer>
    </div>
  );
}

function ActivityCard({ icon, title, description }) {
  return (
    <Card className="activity-card">
      {icon}
      <h2 className="activity-title">{title}</h2>
      <p className="activity-description">{description}</p>
    </Card>
  );
}

function WeatherTheme() {
  const weatherConditions = [
    { icon: <FaSun size={50} className="weather-icon-sunny" />, text: "Sunny Day" },
    { icon: <FaCloud size={50} className="weather-icon-cloudy" />, text: "Cloudy Skies" },
    { icon: <FaSnowflake size={50} className="weather-icon-snowy" />, text: "Snowy Fun" }
  ];

  const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

  return (
    <div className="weather-theme">
      {randomWeather.icon}
      <p className="weather-text">{randomWeather.text}</p>
    </div>
  );
}
