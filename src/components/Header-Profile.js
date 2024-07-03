import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import jwt_decode from "jwt-decode"
//import { createStyles, makeStyles } from '@mui/icons-material';
import { useQuery } from "react-query"
import {List }from '@mui/material';
import { ListItem} from '@mui/material';
import {ListItemIcon }from '@mui/material';
import {ListItemText} from '@mui/material';
import HandymanIcon from '@mui/icons-material/Handyman';

//import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '../features/profile/profileSlice';
import { saveClaimsAction } from '../features/auth/authSlice'

import { loadUsers } from '../data/api/api'


//import { RootState } from 'store/reducers';
import {
  Avatar,
  Box,
  Divider,

  MenuItem,
  Menu,
  Collapse,
  ListSubheader,
  Typography,

} from '@mui/material';
import { 
  LogOut as LogOutIcon, 
  PieChart as PieChartIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  List as ListIcon,
  FilePlus as FilePlusIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  DollarSign as DollarSignIcon,
} from 'react-feather';

const HeaderProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { data: usersData = { results: [] } } = useQuery("users", loadUsers)
  const users = usersData.results

 // console.log(users)
  const token = localStorage.getItem('token');
  //console.log(token);
  const savedClaims = JSON.parse(localStorage.getItem('claims'));
  
  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token);
      dispatch(saveClaimsAction(claims));
      localStorage.setItem('claims', JSON.stringify(claims));
    }
  }, [token, savedClaims, dispatch]);

  //console.log(savedClaims)

  const username = users?.find(user => user.id === savedClaims?.user_id)?.username;
  //console.log(username);


  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  const handleClicks = () => {
    setOpen(!open);
  };

  //console.log(profile)

  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={handleClick}>
        <Avatar
          variant="circle"
          alt="User"
          className=""
          src={profile.avatar}
        />
      </Box>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            border: '1px solid #d3d4d5',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
              <Box p={2}>
              <Box display="flex" justifyContent="center">
              <Avatar
                 variant={"circle"}
                 alt="User"
                 className=""
                 src="{profile.avatar}"
               />
              </Box>
              <Box mt={2} textAlign="center">
                <Typography>Hello:</Typography>
                <Typography variant="body2" color="textSecondary">
                {username}
                </Typography>
              </Box>
            </Box>
        <Divider />

      
              <List>
                <ListSubheader>Reports</ListSubheader>
                <Link className=""to="reports/">
                  <ListItem>
                    <ListItemIcon>
                      <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                  </ListItem>
                </Link>
                <ListSubheader>My Auctions</ListSubheader>
                <ListItem onClick={handleClicks}>
                  <ListItemIcon>
                    <HandymanIcon />
                  </ListItemIcon>
                  <ListItemText primary="Auctions" />
                  {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                  <Link className="" to="list-auctions/">
                      <ListItem className=''>
                        <ListItemIcon>
                          <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="List Auctions" />
                      </ListItem>
                    </Link>
                    <Link className="" to="create-auction/">
                      <ListItem className="">
                        <ListItemIcon>
                          <FilePlusIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Auction" />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>


                <ListSubheader>Applications</ListSubheader>
                <Link className="" to="calendar/">
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Calendar'} />
                  </ListItem>
                </Link>

                <ListSubheader>Pages</ListSubheader>
                <Link className="" to="account/">
                  <ListItem>
                    <ListItemIcon>
                      <UserIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Account'} />
                  </ListItem>
                </Link>
                <Link className="" to="pricing/">
                  <ListItem>
                    <ListItemIcon>
                      <DollarSignIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Pricing'} />
                  </ListItem>
                </Link>
              </List>
            
        <a className='' href="/">
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </a>
      </Menu>
    </div>
  );
};

export default HeaderProfile;

