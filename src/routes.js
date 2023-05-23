import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import Dashboard from './Layout/dashboard-layout';
import Homepage from './view/Homepage';
import NotFoundPage from './view/pages/NotFoundPage';
import ProtectedRoute from './components/protected-route';
import LoginPage from "./view/auth/LoginPage";
import AboutPage from './view/pages/AboutPage';
import PricingPage from "./view/products/LoggedIn/pricing/PricingPage";
import DashboardDefaultContent from './view/products/LoggedIn/dashboard-default-content';
import AuctionListView from '../src/view/products/LoggedIn/AuctionListView';
import AuctionCreateView from "./view/products/LoggedIn/AuctionCreateView";
import AccountView from "./view/products/LoggedIn/accountView";

export const Routess = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
      <Routes>
        {/* eager loading */}
        <Route path="/" element={<Homepage />} />
        {/* lazy loading */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/dashboard/*"
          element={
            <Dashboard>
              <Routes>
                <Route
                  path="/"
                  element={<DashboardDefaultContent />}
                />
                <Route
                  path="list-auctions"
                  element={<AuctionListView />}
                />
                <Route
                  path="create-auction"
                  element={<AuctionCreateView />}
                />
                <Route
                  path="calendar"
                  element={<AuctionCreateView />}
                />
                <Route
                  path="account"
                  element={<AccountView />}
                />
              </Routes>
            </Dashboard>
          }
        />
        {/* eager loading */}
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
