import React from 'react';
import { Container} from "@mui/material"

import Header from './Header';
import ProductCreateForm from './ProductCreateForm';
import Page from '../../../../components/Page';

const ProductCreateView = () => {

  return (
    <Page className="" title="Product Create">
      <Container maxWidth="lg">
        <Header />
        <ProductCreateForm />
      </Container>
    </Page>
  );
};


export default ProductCreateView;
