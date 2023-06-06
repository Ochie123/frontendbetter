import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, styled } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import { Link } from 'react-router-dom';
import { useAllAuctions } from '../../data';
import Result from './Result';
import Filter from './plp/Filter';
import SortButton from './plp/SortButton';

const AuctionListContainer = styled('div')({
  position: 'relative',
});

const SortButtonContainer = styled('div')({
  position: 'absolute',
  top: 0,
  right: 10,
  zIndex: 100, // Adjust the z-index value as needed
});

export default function AuctionList() {
  const results = useAllAuctions();

  return (
    <>
      <AuctionListContainer>
        <SortButtonContainer>
          <SortButton />
        </SortButtonContainer>
        <Sheet
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            width: 'auto',
            height: '300px', // Adjust the height as needed
            margin: '40px 0 20px 0', // Adjust the margin as needed
            borderRadius: 'sm',
          }}
        >
          <Link to="product/">
            <List sx={{ py: 'var(--ListDivider-gap)' }}>
              {results.map((uuid) => (
                <Result uuid={uuid} key={uuid} />
              ))}
            </List>
          </Link>
        </Sheet>
      </AuctionListContainer>

      <Filter />
    </>
  );
}
