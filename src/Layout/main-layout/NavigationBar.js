import * as React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import HeaderProfile from '../../components/Header-Profile';

function ResponsiveAppBar() {
  const token = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg border-radius-sm top-0 z-index-3 shadow position-sticky py-3 start-0 end-0" style={{ backgroundColor: 'blue' }}>
      <div className="container px-1">
        <Typography
          variant="h6"
           noWrap
          component={Link}
          to="/"
          sx={{
         
          fontFamily: 'Helvetica',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'white',
          textDecoration: 'none',
          }}
          >  
            Cars-Bids
        </Typography>


        {token ? (
          <>
            <HeaderProfile />
          </>
        ) : (
          <div className="" id="">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="login"
                sx={{
                fontFamily: 'Helvetica',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
                }}
              >  
                login
             </Typography>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default ResponsiveAppBar;
