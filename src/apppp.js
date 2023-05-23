import React, { lazy, Suspense } from 'react';
import { createGlobalStyle } from "styled-components";

import 'react-quill/dist/quill.snow.css';
import { SnackbarProvider } from 'notistack';
import Helmet from 'react-helmet';

import MainLayout from '../src/Layout/main-layout/MainLayout'


import CategoryView from './view/categories/CategoryView';


//Auth
import LoginPage from "./view/auth/LoginPage";

import ProtectedRoute from "./components/protected-route";

//LoggedIn

import AuctionListView from '../src/view/products/LoggedIn/AuctionListView'
import AuctionCreateView from "./view/products/LoggedIn/AuctionCreateView";

import PricingPage from "./view/products/LoggedIn/pricing/PricingPage";
import AccountView from "./view/products/LoggedIn/accountView";

import DashboardSidebarNavigation from './Layout/dashboard-layout';

import DashboardDefaultContent from './view/products/LoggedIn/dashboard-default-content';

import ProfileId from './view/Detail/ProfileId';

import Dashboard from './Layout/dashboard-layout';
import DataProvider from "./data";

import { DetailPage } from './view/Detail/DetailPage';
import NotFoundPage from './view/pages/NotFoundPage';
import AboutPage from './view/pages/AboutPage';
//import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./style.css";

//import '../src/view/Detail/scss/astro-ecommerce.scss'
import {LinearProgress} from '@mui/material';

import Homepage from "./view/Homepage";
//import './Layout.scss';


import { useSelector } from 'react-redux';


import { RootState } from '../src/store/reducers'


import { BrowserRouter as Router, Switch, Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  const { claims } = useSelector(state => state.auth)


  return (
    <DataProvider>
      <GlobalStyle />
      <SnackbarProvider dense maxSnack={3}>
      <Router>
      <Helmet
          titleTemplate="%s - Mackenya"
          defaultTitle="Mackenya"
        >
          <meta name="description" content="Mackenya application" />
        </Helmet> 
        <MainLayout>
        <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
        <Routes>

        <Route path="/" element={<Homepage />} />

        <Route path="login/" element={<LoginPage/>} />


        <Route path="/about" element={<AboutPage />} />

        <Route path="reports/" element={<DashboardDefaultContent/>} />

        <Route path="list-auctions/" element={<AuctionListView/> } />
        <Route path="create-auction/" element={<AuctionCreateView/>} />

        <Route path="category/" element={<CategoryView/>} />

        <Route path="pricing/" element={<PricingPage/>} />
        <Route path="account/" element={<AccountView/>} />
        


        <Route path="product/" element={<DetailPage/>} />

        <Route path="profile-id/" element={<ProfileId/>} />


        <Route path="auctions/:id" element={<DetailPage/>} />
        <Route path='/not-found' element={<NotFoundPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
    
        </Routes>
        
        </Suspense>
        </MainLayout>
   
      </Router>
       
      </SnackbarProvider>
    </DataProvider>
  );
}

export default App;
