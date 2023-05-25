import * as React from 'react';
//import AspectRatio from '@mui/joy/AspectRatio';
//import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
//import ListDivider from '@mui/joy/ListDivider';
//import ListItem from '@mui/joy/ListItem';
//import ListItemContent from '@mui/joy/ListItemContent';
//import ListItemButton from '@mui/joy/ListItemButton';

import { useAllAuctions } from '../../data';

//import {useThisProduct}  from '../../data';
import data from '../Detail/data.json'

import Result from './Result';
import CardCategory from '../Detail/Imports/CardCategory';

import { Link} from "react-router-dom";

import styled from "styled-components";

const Main = styled.main`
  margin: 3em;
  margin-left: 1px;
`;




function NewlyListed() {
  const results = useAllAuctions();

  //console.log(results)
    return (
        <>
    <Main>
     <div className="pt-3">
      <div className="page-width">
        <h2>Newly Listed</h2>
      </div>
    </div>
    </Main>
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
        
        <div className="d-flex justify-content-between align-items-center mb-4">
        <a className="text-primary text-sm font-weight-bold" href="/">Browse all </a>
      </div>

  

       </>
    );
}
export default NewlyListed;