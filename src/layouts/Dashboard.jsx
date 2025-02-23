import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { Home, Info, Map, Thunderstorm } from '@mui/icons-material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Outlet } from 'react-router-dom';


const NAVIGATION = [
  {
    segment: 'home',
    title: 'Home',
    icon: <Home />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'weather',
    title: 'Weather',
    icon: <Thunderstorm />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'map',
    title: 'Map',
    icon: <Map />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'about',
    title: 'About',
    icon: <Info />,
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/home');



  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="Weather Logo" />,
        title: 'Weather App',
        homeUrl: '/home',
      }}
      router={router}
      theme={theme}
      window={window}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.object,
};

export default DashboardLayoutBasic;
