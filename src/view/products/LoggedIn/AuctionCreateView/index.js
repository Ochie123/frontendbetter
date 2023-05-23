import React from 'react';
import { Container} from "@mui/material"

import Header from './Header';
import AuctionCreateForm from './AuctionCreateForm';
import Page from '../../../../components/Page';

const AuctionCreateView = () => {

  return (
    <Page className="" title="Auction Create">
      <Container maxWidth="lg">
        <Header />
        <AuctionCreateForm />
      </Container>
    </Page>
  );
};


export default AuctionCreateView;
