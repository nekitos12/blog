import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './components/app'
import { setUpStore } from './store/store'

const store = setUpStore()
const theme = createTheme({
  palette: {
    success: {
      main: '#52C41A',
    },
    secondary: {
      main: 'rgba(0, 0, 0, 0.85)',
    },
    info: {
      main: '#1890FF',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
