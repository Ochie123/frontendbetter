import React, { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/material/Container';
import List from '@mui/joy/List';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { useAllAuctions } from '../../data';
import Result from './Result';
import Filter from './plp/Filter';
import Filters from './plp/Filters'
import SortButton from './plp/SortButton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

import ActionButton from './ActionButton';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AuctionListContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipses',
  marginLeft: '10px',
});
// @C0794751181c
const SortButtonContainer = styled('div')({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipses',
  top: '75px',
  right: 10,
  zIndex: '100',
  position: 'absolute',
});

const FilterContainer = styled('div')({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipses',
  marginLeft: 'auto',
  position: 'absolute',
  top: '75px',
  right: 10,
  zIndex: '90',
});

export default function AuctionList() {
  const results = useAllAuctions();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>

    <Container maxWidth="lg">
    <div className="d-flex border-bottom pb-1">
             <h2 className="mb-5"></h2>
            <div className="d-flex ms-auto align-items-center">
      
          <SortButton />
       
        </div>
        </div>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Filter />
          </Grid>

          <Grid item xs={8}>
            <Sheet
              variant=""
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                width: 'auto',
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
            </Grid>
        </Grid>
        </Box>
      
         
    
        {/* Mobile Layout */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <IconButton
          color="inherit"
          aria-label="filter"
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            bottom: '10px',
            left: '20px',
            zIndex: 100,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
          }}
        >
  <FilterListIcon sx={{ fontSize: '28px' }} />
</IconButton>

          <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer}>
            <Filter />
          </Drawer>
          <List sx={{ py: 'var(--ListDivider-gap)' }}>
            {results.map((uuid) => (
              <Result uuid={uuid} key={uuid} />
            ))}
          </List>
        </Box>
      
    </Container>
    </>
  );
}
