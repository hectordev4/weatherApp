import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#50a2b9',
      contrastText: '#0a0e0f',
    },
    secondary: {
      main: '#95cfdf',
      contrastText: '#0a0e0f',
    },
    accent: {
      main: '#ff9800', // Custom accent color
    },
    divider: '#64c3dd',
    background: {
      default: '#f5f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgb(10, 14, 15)',
      secondary: 'rgba(10, 14, 15, 0.6)',
      disabled: 'rgba(10, 14, 15, 0.38)',
      hint: 'rgb(100, 195, 221)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 'bold',
      color: '#000',
    },
    body1: {
      color: '#333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          boxShadow: '0 3px 3px 0 rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#50a2b9',
      contrastText: '#0a0e0f',
    },
    secondary: {
      main: '#95cfdf',
      contrastText: '#0a0e0f',
    },
    accent: {
      main: '#ff9800', // Custom accent color
    },
    divider: '#64c3dd',
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bdbdbd',
      disabled: 'rgba(255, 255, 255, 0.38)',
      hint: 'rgb(100, 195, 221)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 'bold',
      color: '#fff',
    },
    body1: {
      color: '#ccc',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          boxShadow: '0 3px 3px 0 rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});

export const ThemeProvider = ({ children, theme }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};