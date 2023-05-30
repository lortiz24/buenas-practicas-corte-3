import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { HomePage } from './pages/HomePage';
import { darkTheme } from './theme/darkTheme';
import { ThemeProvider, CssBaseline } from '@mui/material'
import { MainLayout } from './layout/MainLayout';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProvider>
  </React.StrictMode>,
)
