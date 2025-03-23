// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './theme'; // If you have a custom theme, otherwise remove

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* ❌ Remove the "future" prop to eliminate those warnings */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
