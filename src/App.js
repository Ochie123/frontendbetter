import React, { lazy, Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import 'react-quill/dist/quill.snow.css';
import Helmet from 'react-helmet';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
//import { useSelector } from 'react-redux';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/view/Detail/scss/astro-ecommerce.scss"
import "../src/Layout/main-layout/Layout.scss"
import MainLayout from '../src/Layout/main-layout/MainLayout';
//import ProtectedRoute from "./components/protected-route";
//import Homepage from "./view/Homepage";
import DataProvider from './data';


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

const Homepage = lazy(() => import('./view/Homepage'));
const LoginPage = lazy(() => import('./view/auth/LoginPage'));
const AboutPage = lazy(() => import('./view/pages/AboutPage'));
const DashboardDefaultContent = lazy(() => import('./view/products/LoggedIn/dashboard-default-content'));
const AuctionListView = lazy(() => import('../src/view/products/LoggedIn/AuctionListView'));
const AuctionCreateView = lazy(() => import('./view/products/LoggedIn/AuctionCreateView'));
const PricingPage = lazy(() => import('./view/products/LoggedIn/pricing/PricingPage'));
const AccountView = lazy(() => import('./view/products/LoggedIn/accountView'));
const Mybids = lazy(() => import('./view/products/LoggedIn/footer/Mybids'));
const Favorites = lazy(() => import('./view/products/LoggedIn/footer/Favorites'));
const Ending = lazy(() => import('./view/products/LoggedIn/footer/Ending'));
const ProfileId = lazy(() => import('./view/Detail/ProfileId'));
const DetailPage  = lazy(() => import('./view/Detail/DetailPage').then((module) => ({ default: module.DetailPage })));
const NotFoundPage = lazy(() => import('./view/pages/NotFoundPage'));
const AuctionList = lazy(() => import('./view/AuctionsList/AuctionsList'));
const OurCollection = lazy(() => import('../src/Layout/main-layout/SellAdvert/OurCollection'));
const Howtosell = lazy(() => import('../src/Layout/main-layout/SellAdvert/Howtosell'));
const OurSafeguards = lazy(() => import('../src/Layout/main-layout/SellAdvert/OurSafeguards'));
const ContactUsPage = lazy(() => import('../src/view/pages/ContactUsPage'));
const FreebiesPage = lazy(() => import('../src/view/pages/FreebiesPage'));
const BlogPage = lazy(() => import('../src/view/pages/BlogPage'));
const KnowledgeCenterPage = lazy(() => import('../src/view/pages/KnowledgeCenterPage'));
const AffiliateProgramPage = lazy(() => import('../src/view/pages/AffiliateProgramPage'));
const PrivacyPolicyPage = lazy(() => import('../src/view/pages/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('../src/view/pages/TermsConditionsPage'));






function App() {
  const { claims } = useSelector(state => state.auth)

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
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/how-to-sell" element={<Howtosell />} />
                <Route path="/our-safeguards" element={<OurSafeguards />} />
                <Route path="/discover-our-collection" element={<OurCollection />} />
                <Route path="contact-us/" element={<ContactUsPage />} />
                <Route path="freebies/" element={<FreebiesPage />} />
                <Route path="knowledge-center/" element={<KnowledgeCenterPage />} />
                <Route path="terms-conditions/" element={<TermsConditionsPage />} />
                <Route path="privacy-policy/" element={<PrivacyPolicyPage />} />
                <Route path="blog/" element={<BlogPage />} />
                <Route path="affiliate-program/" element={<AffiliateProgramPage />} />
                <Route path="reports/" element={<DashboardDefaultContent />} />
                <Route path="list-auctions/" element={<AuctionListView />} />
                <Route path="create-auction/" element={<AuctionCreateView />} />
                <Route path="pricing/" element={<PricingPage />} />
                <Route path="account/" element={<AccountView />} />
                <Route path="ending-soon/" element={<Ending />} />
                <Route path="my-favorites/" element={<Favorites />} />
                <Route path="my-bids/" element={<Mybids />} />
                <Route path="users/:ownerId" element={<ProfileId />} />
                <Route path="auctions/" element={<AuctionList />} />
                <Route path="auctions/:id" element={<DetailPage/>} />
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