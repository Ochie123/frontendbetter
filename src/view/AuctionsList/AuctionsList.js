import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, styled } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import { Link } from 'react-router-dom';
import { useAllAuctions } from '../../data';
import Result from './Result';

import Filter from './plp/Filter';
import SortButton from './plp/SortButton';


export default function AuctionList() {
  const results = useAllAuctions();

  return (
    <>
        <Sheet
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            width: 'auto',
            height: '300',
            margin: 1,
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
        
      
      <Filter/>
      <SortButton/>
    </>
  )
}
