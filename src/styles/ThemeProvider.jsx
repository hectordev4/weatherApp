// themes.js

// Light theme configuration
export const lightTheme = {
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2', // Blue primary color
      },
      secondary: {
        main: '#f50057', // Pink secondary color
      },
      background: {
        default: '#f5f5f5', // Light background color
        paper: '#ffffff', // Paper background for cards, dialogs, etc.
      },
      text: {
        primary: '#000000', // Dark text for light theme
        secondary: '#666666', // Light secondary text
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
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          },
        },
      },
    },
  };
  
  // Dark theme configuration
  export const darkTheme = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9', // Light blue primary color
      },
      secondary: {
        main: '#f48fb1', // Light pink secondary color
      },
      background: {
        default: '#303030', // Dark background color
        paper: '#424242', // Dark paper background
      },
      text: {
        primary: '#ffffff', // Light text for dark theme
        secondary: '#bdbdbd', // Lighter secondary text
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
            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          },
        },
      },
    },
  };
  