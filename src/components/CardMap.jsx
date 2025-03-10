import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Box, Button, Typography } from '@mui/material';
import WeatherForecast from './WeatherForecast';

const CardMap = ({ position, cityName, addToFavorites, favorites }) => {
  const handleAddToFavorites = () => {
    setTimeout(() => {
      addToFavorites();
    }, 200); // Adjust the delay as needed
  };

  const isFavorite = favorites.some(fav => fav.name === cityName);

  return (
    <Marker position={position}>
      <Popup>
        <Box sx={{ width: '300px', height: '550px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">{cityName || "Click on a city"}</Typography>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <WeatherForecast lat={position[0]} lon={position[1]} />
          </Box>
          {!isFavorite && (
            <Button variant="contained" onClick={handleAddToFavorites}>⭐ Save to Favorites</Button>
          )}
        </Box>
      </Popup>
    </Marker>
  );
};

export default CardMap;