import React from 'react';

import {
  Backdrop,
  Box,
  CircularProgress,
  Container,

} from '@mui/material';

import { useQuery } from "react-query";
import { loadProducts } from '../../../../data/api/api'
//import { useAllProducts } from '../../../../data';
import Header from './Header';
import Results from './Results';
import Page from '../../../../components/Page';
//import datas from '../../../../datas.json'
//import { ProductType } from 'models/product-type';
//import { getProductsAxios } from '../../../../services/ProductService'

function ProductListView () {
  const classes = useStyles();
  const { data = { results: [] }} = useQuery("results", loadProducts);
  const [open, setOpen] = React.useState(false);
  
  //console.log(data)
 
 
  //const results = useAllProducts();

  const results = data.results;

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Page className={classes.root} title="Product List">
      <Container maxWidth={false}>
        <Header />
      
 
    {data.results && (
          <Box mt={3}>
            <Results results={results} />
          </Box>
        )}
   
      <Backdrop
          className=""
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
   
    
       
      </Container>
    </Page>
  );
};


const useStyles = (theme) =>  ({
  root: {},

})

export default ProductListView;
