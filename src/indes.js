import { createGlobalStyle } from "styled-components";

import 'react-quill/dist/quill.snow.css';
import { SnackbarProvider } from 'notistack';
import Helmet from 'react-helmet';
import Products from "./view/products/Products";
import Detail from "./view/products/Detail"
import MainLayout from '../src/Layout/main-layout/MainLayout'

import CategoryDetail from './view/categories/CategoryDetail';

import CategoryView from './view/categories/CategoryView';

import Categories from "./view/categories/Categories";
//Auth
import LoginPage from "./view/auth/LoginPage";

import ProtectedRoute from "./components/protected-route";

//LoggedIn
import ProductListView from '../src/view/products/LoggedIn/ProductListView'
import ProductCreateView from "./view/products/LoggedIn/ProductCreateView";
import PricingPage from "./view/products/LoggedIn/pricing/PricingPage";
import AccountView from "./view/products/LoggedIn/accountView";

import DataProvider from "./data";

import DetailPage from './view/Detail/DetailPage';

//import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./style.css";

//import '../src/view/Detail/scss/astro-ecommerce.scss'

import Homepage from "./view/Homepage";
//import './Layout.scss';

import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";

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
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/" element={<Products />} />
        <Route path="/" element={<Categories />} />
        <Route path="/" element={<Categories />} />
        <Route path="login/" element={<LoginPage/>} />
        
        
        
        <Route path="list-products/" element={
       
        <ProductListView/>
      
        } 
      
        />
        <Route path="create-product/" element={<ProductCreateView/>} />

        <Route path="category/" element={<CategoryView/>} />

        <Route path="pricing/" element={<PricingPage/>} />
        <Route path="account/" element={<AccountView/>} />
        


        <Route path="product/" element={<DetailPage/>} />


        <Route path="products/:id" element={<DetailPage/>} />
        <Route path="categories/:id" element={<CategoryDetail />} />

        </Routes>
        </MainLayout>
      </Router>
      </SnackbarProvider>
    </DataProvider>
  );
}

export default App;
