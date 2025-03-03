import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Weather.css';  // Assuming the CSS is saved in styles.css

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(currentWeatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecast(
        forecastResponse.data.list.filter((_, index) => index % 8 === 0)
      );
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Fetch default data on load if needed

  return (
    <div className="container">
      <h1>Weather Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Current Weather in {weather.name}</h2>
          <p>
            Temperature: <span className="temp">{weather.main.temp}</span>°C
          </p>
          <p className="condition">Condition: {weather.weather[0].description}</p>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="forecast">
          <h2>5-Day Forecast</h2>
          {forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <p>Date: {new Date(day.dt_txt).toLocaleDateString()}</p>
              <p>Temp: <b>{day.main.temp}</b> °C</p>
              <p>Condition: {day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
