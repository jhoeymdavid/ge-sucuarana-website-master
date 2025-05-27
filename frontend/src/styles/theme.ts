import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      orange: string
      darkBlue: string
      lightGray: string
    }
  }
  interface PaletteOptions {
    custom: {
      orange: string
      darkBlue: string
      lightGray: string
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#BC884F', 
      light: '#FF784E',
      dark: '#C41C00',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A237E', 
      light: '#534BAE',
      dark: '#000051',
      contrastText: '#FFFFFF',
    },
    custom: {
      orange: '#FF5722',
      darkBlue: '#1A237E',
      lightGray: '#F5F5F5'
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
})

export default theme