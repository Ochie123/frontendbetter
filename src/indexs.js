import React, { lazy, Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import 'react-quill/dist/quill.snow.css';
import Helmet from 'react-helmet';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from '../src/Layout/main-layout/MainLayout';
import DataProvider from './data';
import Homepage from "./view/Homepage";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Raleway', sans-serif;
  }
  body {
    margin: 2;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

//const Homepage = lazy(() => import('./view/Homepage'));
const LoginPage = lazy(() => import('./view/auth/LoginPage'));
const AboutPage = lazy(() => import('./view/pages/AboutPage'));
const DashboardDefaultContent = lazy(() => import('./view/products/LoggedIn/dashboard-default-content'));
const AuctionListView = lazy(() => import('../src/view/products/LoggedIn/AuctionListView'));
const AuctionCreateView = lazy(() => import('./view/products/LoggedIn/AuctionCreateView'));
const CategoryView = lazy(() => import('./view/categories/CategoryView'));
const PricingPage = lazy(() => import('./view/products/LoggedIn/pricing/PricingPage'));
const AccountView = lazy(() => import('./view/products/LoggedIn/accountView'));
const Mybids = lazy(() => import('./view/products/LoggedIn/footer/Mybids'));
const Favorites = lazy(() => import('./view/products/LoggedIn/footer/Favorites'));
const Ending = lazy(() => import('./view/products/LoggedIn/footer/Ending'));
const ProfileId = lazy(() => import('./view/Detail/ProfileId'));
const  DetailPage  = lazy(() => import('./view/Detail/DetailPage').then((module) => ({ default: module.DetailPage })));
const NotFoundPage = lazy(() => import('./view/pages/NotFoundPage'));
const AuctionList = lazy(() => import('./view/AuctionsList/AuctionsList'));

function App() {
  const { claims } = useSelector((state) => state.auth);

  return (
    <DataProvider>
      <GlobalStyle />
      <SnackbarProvider dense maxSnack={3}>
        <Router>
          <Helmet titleTemplate="%s - Cars-bids" defaultTitle="Cars-bids">
            <meta name="description" content="Cars-bids" />
          </Helmet>
          <MainLayout>
            <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="login/" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="reports/" element={<DashboardDefaultContent />} />
                <Route path="list-auctions/" element={<AuctionListView />} />
                <Route path="create-auction/" element={<AuctionCreateView />} />
                <Route path="category/" element={<CategoryView />} />
                <Route path="pricing/" element={<PricingPage />} />
                <Route path="account/" element={<AccountView />} />
                <Route path="ending-soon/" element={<Ending />} />
                <Route path="my-favorites/" element={<Favorites />} />
                <Route path="my-bids/" element={<Mybids />} />
                <Route path="product/" element={<DetailPage />} />
                <Route path="users/:ownerId" element={<ProfileId />} />
                <Route path="auctions/" element={<AuctionList />} />
                <Route path="auctions/:id" element={<DetailPage />} />
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </Router>
      </SnackbarProvider>
    </DataProvider>
  );
}

export default App;