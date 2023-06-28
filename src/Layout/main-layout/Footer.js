import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Paper from '@mui/material/Paper';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from 'react-router-dom';

export default function FixedBottomNavigation() {

  return (
    <Box sx={{ pb: 7 }}>
        
      <CssBaseline />

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
    
        >
        <Link to="ending-soon/">
          <BottomNavigationAction label="Ending" icon={<RestoreIcon />} />
        </Link>
        <Link to="my-favorites/">
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </Link>
        <Link to="my-bids/">
          <BottomNavigationAction label="Archive" icon={<LocalOfferIcon/>} />
        </Link>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

