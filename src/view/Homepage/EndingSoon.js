import * as React from 'react';
import Box from '@mui/joy/Box';
import { Link} from "react-router-dom";
import { useAllAuctions } from '../../data';
import Ending from './Ending';

import styled from "styled-components";


const Main = styled.main`
  margin: 1em;
`;


function EndingSoon() {
  const data = useAllAuctions();

  console.log(data)

    return (
       <>
      <div className='container'> 
    <div className="pt-3">
    <div className="page-width">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Ending Soon</h2>
        <Link to={`/auctions/`} className="text-primary text-sm font-weight-bold ml-auto">
          Browse all {'>>>'}
        </Link>
      </div>  
      </div>


    </div>
    </div>
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
        {data?.slice(0, 10).map((uuid) => (
        <Ending uuid={uuid} key={uuid} />
      ))}
        </Box>
        <hr className="dark horizontal my-5" />
        </>
      );
}
export default EndingSoon;