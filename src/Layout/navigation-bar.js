import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { makeStyles } from '@mui/styles';

import {
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
} from '@mui/material';
import HeaderProfile from '../components/Header-Profile';

import { styled } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';




function NavigationBar() {
  //const classes = useStyles();
  const { claims } = useSelector(state => state.auth)
  const mobileDevice = useMediaQuery('(max-width:650px)');


  return (
    <div className=''>
      <AppBar position="static">
        <Toolbar>
          <Link className='' to={'/'}>
            {!mobileDevice && 'LOGO'}
          </Link>

          <Button className='' color="inherit">
            <Link to={'/'}>
              Home
            </Link>
          </Button>
          <Button className='' color="inherit">
            <Link to={'/about'}>
              About
            </Link>
          </Button>
          {claims ? (
            <>
              <Button className='' color="inherit">
                <Link to={'/dashboard'}>
                  Dashboard
                </Link>
              </Button>
              <HeaderProfile />
            </>
          ) : (
            <Button className='' color="inherit">
              <Link to={'/login'}>
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavigationBar;