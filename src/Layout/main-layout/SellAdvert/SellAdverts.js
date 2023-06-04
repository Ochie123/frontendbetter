import React from 'react';
import Box from '@mui/joy/Box';
import SellAdvert from './SellAdvert';
import MKTypography from '../MKTypography';

import styled from "styled-components";


const Main = styled.main`
  margin: 1em;
`;


const SellAdverts = () => (
    <>
   <Main>
  <div className="pt-3">
  <MKTypography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Getting Started
    </MKTypography>
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
   
    <SellAdvert/>
  
  </Box>
  </>
);

export default SellAdverts;
