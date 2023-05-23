import React, { lazy, Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import { Helmet } from 'react-helmet';
import { LinearProgress } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainLayout from '../src/Layout/main-layout/MainLayout';
import Homepage from './view/Homepage';
import NotFoundPage from './view/pages/NotFoundPage';
import { Routess } from './routes';
import DataProvider from "./data";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Raleway', sans-serif;
  }
  body {
    margin: 2;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <DataProvider>
      <GlobalStyle />
      <SnackbarProvider dense maxSnack={3}>
        <Router>
          <Helmet titleTemplate="%s - Mackenya" defaultTitle="Mackenya">
            <meta name="description" content="Mackenya application" />
          </Helmet>
          <MainLayout>
            <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
        
              <Routess />
            </Suspense>
          </MainLayout>
        </Router>
      </SnackbarProvider>
    </DataProvider>
  );
}

export default App;
