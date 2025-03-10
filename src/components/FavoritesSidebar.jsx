import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FavoritesSidebar = ({ favorites, onRemoveFromFavorites, handleMapClick }) => {
  return (
    <Box
      sx={{
        width: 250,
        padding: 2,
        backgroundColor: 'background.paper',
        borderLeft: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6">Favorites</Typography>
      <List>
        {favorites.map((city, index) => (
          <ListItem
            key={index}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box
              component="button"
              onClick={() => handleMapClick(city.lat, city.lon)}
              sx={{
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0,
                cursor: 'pointer',
                textAlign: 'center',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ListItemText primary={city.name} />
            </Box>
            <IconButton edge="end" onClick={() => onRemoveFromFavorites(city.name)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FavoritesSidebar;