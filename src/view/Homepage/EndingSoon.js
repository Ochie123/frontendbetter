import * as React from 'react';
import Box from '@mui/joy/Box';

import { useAllAuctions } from '../../data';
import Ending from './Ending';

import styled from "styled-components";


const Main = styled.main`
  margin: 1em;
`;


function EndingSoon() {
  const results = useAllAuctions();

  console.log(results)

    return (
       <>
       <Main>
  <div className="pt-3">
      <div className="page-width">
        <h2>Ending Soon</h2>
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
          {results.map((uuid) => (
   
            <Ending uuid={uuid} key={uuid} />

          ))}
        </Box>
        </>
      );
}
export default EndingSoon;