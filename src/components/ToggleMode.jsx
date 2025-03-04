import * as React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Container from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ThemeProvider } from '@mui/material';
import { useState } from 'react';

export default function ToggleMode() {
  return (
    <Container direction="row" spacing={2}>
      <LightModeIcon sx={{background: 'white', color: 'black', borderRadius: '150px', width: '50px', height:'auto', padding: '5px', alignContent: 'center'}}
      />
      <FormControlLabel
        sx={{ display: 'block' }}
        control={
          <Switch
            checked={ThemeProvider}
            onChange={() => setTheme(!theme)}
            name="loading"
            color="primary"
          />
        }
      />
      <DarkModeIcon sx={{background: 'black', color: 'white', borderRadius: '150px', width: '25px', height:'auto', padding: '5px', alignContent: 'center'}}
      />
    </Container>
  );
}