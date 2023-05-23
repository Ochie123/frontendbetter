import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import authSlice from '../../store/slices/auth'
import useSWR from "swr"
import { fetcher } from '../../utils/axios'

import { RootState } from '../../store/reducers';

import HeaderProfile from '../../components/Header-Profile';
import { useMediaQuery } from "@mui/material"
import { Link } from 'react-router-dom';

//import { useAllCategories } from '../data';
//import Category from '../view/categories/Category';

//import DashboardSidebarNavigation from '../DashboardSidebarNavigation.js'

//const pages = ['Products', 'Pricing', 'Blog'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const account = useSelector(state => state.auth.account)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // @ts-ignore
  const userId = account?.id

  const user = useSWR(`/user/${userId}/`, fetcher)
  //console.log(claims)

  const mobileDevice = useMediaQuery('(max-width:650px)');

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(authSlice.actions.logout())
    navigate("/login")
  }
  
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          
          <Typography
      variant="h6"
      noWrap
      component={Link}
      to="/"
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
              
            LOGO
          </Typography>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
     
          {user.data ? (
              <>
              </>    
              
            ): (
        <>
   
        </>
            )}
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
             noWrap
              component={Link}
              to="/"
               sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
              
            LOGO
          </Typography>
          {user.data ? (
            <>
             <Box sx={{ flexGrow: 1, display: { flexGrow: 1, display: 'flex', justifyContent: 'flex-end'  } }}>
        

         <HeaderProfile/>
         
          
          </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: {flexGrow: 1, display: 'flex', justifyContent: 'flex-end'  } }}>
  
            <Button
            
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >

            <Typography
      variant="h6"
      noWrap
      component={Link}
      to={'/login'}
      sx={{
        mr: 2,
        display: { xs: 'flex', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
              
            Login
          </Typography>
            </Button>
          
     
        </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;