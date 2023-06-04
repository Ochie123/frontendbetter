import React from 'react';
import Box from '@mui/joy/Box';
import CarType from './CarType';

import styled from "styled-components";


const Main = styled.main`
  margin: 1em;
`;


const CarTypes = () => (
    <>
   <Main>
  <div className="pt-3">
      <div className="page-width">
        <h2>Browse by Type</h2>
      </div>
    </div>
    </Main>
    <Box
    sx={{
      display: 'flex',
      gap: 1,
      py: 1,
      overflow: 'auto',
      width: 'auto',
     
      margin: 1,
      scrollSnapType: 'x mandatory',
      '& > *': {
        scrollSnapAlign: 'center',
      },
      '::-webkit-scrollbar': { display: 'none' },
    }}
  >
   
    <CarType/>
  
  </Box>
  </>
);

export default CarTypes;
