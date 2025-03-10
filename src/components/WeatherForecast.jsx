import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

// OpenWeatherMap API Key
const WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const WeatherForecast = ({ lat, lon }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch 4-day forecast (including today)
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        setForecast(forecastResponse.data.list.slice(0, 4));
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon]);

  const getWeatherIcon = (weather) => {
    const iconSize = 24; // Adjust icon size here
    switch (weather) {
      case 'Clear':
        return <WiDaySunny size={iconSize} />;
      case 'Clouds':
        return <WiCloud size={iconSize} />;
      case 'Rain':
        return <WiRain size={iconSize} />;
      case 'Snow':
        return <WiSnow size={iconSize} />;
      case 'Thunderstorm':
        return <WiThunderstorm size={iconSize} />;
      case 'Fog':
      case 'Mist':
      case 'Haze':
        return <WiFog size={iconSize} />;
      default:
        return <WiDaySunny size={iconSize} />;
    }
  };

  return (
    <Card className="weather-card" sx={{ width: '100%', height: '100%', padding: 2 }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '8px', display: 'none' }, '&:hover::-webkit-scrollbar': { display: 'block' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' }, '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' } }}>
          {forecast && forecast.length > 0 && (
            <>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Today's Weather</Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{new Date(forecast[0].dt * 1000).toLocaleDateString()}</Typography>
              <Typography sx={{ fontSize: '1rem' }}>{forecast[0].weather[0].main}</Typography>
              {getWeatherIcon(forecast[0].weather[0].main)}
              <Typography sx={{ fontSize: '1rem' }}>{Math.round(forecast[0].main.temp)}°C</Typography>
              <Divider sx={{ marginY: 3 }} />
            </>
          )}
          {forecast && forecast.length > 1 && (
            <>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>3-Day Forecast</Typography>
              {forecast.slice(1).map((day, index) => (
                <React.Fragment key={index}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{new Date((day.dt + index * 86400) * 1000).toLocaleDateString()}</Typography>
                  <Typography sx={{ fontSize: '1rem' }}>{day.weather[0].main}</Typography>
                  {getWeatherIcon(day.weather[0].main)}
                  <Typography sx={{ fontSize: '1rem' }}>{Math.round(day.main.temp)}°C</Typography>
                  {index < forecast.length - 2 && <Divider sx={{ marginY: 1 }} />}
                </React.Fragment>
              ))}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;