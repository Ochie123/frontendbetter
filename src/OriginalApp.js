import { createGlobalStyle } from "styled-components";
import Helmet from 'react-helmet';
import Products from "./view/products/Products";
import Detail from "./view/products/Detail"
import MainLayout from "./Layout/MainLayout";

import CategoryDetail from './view/categories/CategoryDetail';

import CategoryView from './view/categories/CategoryView';

import Categories from "./view/categories/Categories";

//LoggedIn
import ProductListView from '../src/view/products/LoggedIn/ProductListView'

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
        <Route path="product/" element={<DetailPage/>} />

        <Route path="list-products/" element={<ProductListView/>} />
        <Route path="category/" element={<CategoryView/>} />


        <Route path="products/:id" element={<Detail />} />
        <Route path="categories/:id" element={<CategoryDetail />} />

        </Routes>
        </MainLayout>
      </Router>
      
    </DataProvider>
  );
}

export default App;
