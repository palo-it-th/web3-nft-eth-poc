import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Colors } from './constants/colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Work Sans',
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 20px',
          borderRadius: '20px'
        }
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            ':hover': {
              background: Colors.purple['300'],
            },
            background: Colors.purple['400'],
            color: 'white',
          },
        },
      ],
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
)
