import React, { useEffect, useState } from 'react';
import axios from 'axios';

// OpenWeatherMap API Key
const WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const WeatherForecast = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data.list.slice(0, 3)); // Get 3-day forecast
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon]);

  return (
    <>
      {weather &&
        weather.map((day, index) => (
          <div key={index}>
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>{day.weather[0].main}</p>
            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
    </>
  );
};

export default WeatherForecast;