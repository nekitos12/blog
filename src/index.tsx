import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import App from './components/app';
import { Provider } from 'react-redux';
import {setUpStore} from "./store/store";
import {BrowserRouter} from "react-router-dom";
const store = setUpStore()
const theme = createTheme({
    palette: {
        success: {
            main: '#52C41A',
        },
        secondary: {
          main: 'rgba(0, 0, 0, 0.85)'
        }
    },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);
