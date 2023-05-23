import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { createStyles, makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  ListSubheader,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  List as ListIcon,
  FilePlus as FilePlusIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  DollarSign as DollarSignIcon,
  LogOut as LogOutIcon,
} from 'react-feather';

//import { RootState } from 'store/reducers';
import { getProfileAction } from '../../features/profile/profileAsyncActions'
import clsx from 'clsx';

const DashboardSidebarNavigation = () => {
  //const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { claims } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  //const { url } = useMatch();
  const mobileDevice = useMediaQuery('(max-width:650px)');

  useEffect(() => {
    dispatch(getProfileAction(claims.sub));
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <div className='root'>
        <Drawer
          className={clsx()}
          variant="permanent"
         
          anchor="right"
        >
          {profile.name && !mobileDevice && (
            <Box p={2}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="User"
                  className=''
                  src={profile.avatar}
                />
              </Box>
              <Box mt={2} textAlign="center">
                <Typography>{profile.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Your tier: {profile.tier}
                </Typography>
              </Box>
            </Box>
          )}
          <Divider />
          {mobileDevice ? (
            <div className='drawerContainer'>
              <List>
                <Link className='' to="/">
                  <ListItem>
                    <ListItemIcon>
                      <PieChartIcon />
                    </ListItemIcon>
                  </ListItem>
                </Link>
                <Divider />
                <ListItem onClick={handleClick}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </ListItem>
                <Divider />
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link className='' to="list-auctions/">
                      <ListItem className=''>
                        <ListItemIcon>
                          <ListIcon />
                        </ListItemIcon>
                      </ListItem>
                    </Link>
                    <Link className='' to="create-auction/">
  <ListItem  className=''>
    <ListItemIcon>
      <FilePlusIcon />
    </ListItemIcon>
  </ListItem>
</Link>
</List>
</Collapse>
<Divider />
<Link className='' to="calendar">
  <ListItem >
    <ListItemIcon>
      <CalendarIcon />
    </ListItemIcon>
  </ListItem>
</Link>
<Divider />
<Link className='' to="account/">
  <ListItem>
    <ListItemIcon>
      <UserIcon />
    </ListItemIcon>
  </ListItem>
</Link>
<Divider />
<Link className='' to="pricing/">
  <ListItem>
    <ListItemIcon>
      <DollarSignIcon />
    </ListItemIcon>
  </ListItem>
</Link>
<Divider />
<a className='' href="/">
  <ListItem onClick={handleLogout}>
    <ListItemIcon>
      <LogOutIcon />
    </ListItemIcon>
  </ListItem>
</a>
</List>
<Divider />
</div>
) : (
<div className="drawerContainer">
<List>
<ListSubheader>Reports</ListSubheader>
<Link className='' to="reports/">
  <ListItem>
    <ListItemIcon>
      <PieChartIcon />
    </ListItemIcon>
    <ListItemText primary={'Dashboard'} />
  </ListItem>
</Link>

<ListSubheader>My Auctions</ListSubheader>
<ListItem onClick={handleClick}>
  <ListItemIcon>
    <ShoppingCartIcon />
  </ListItemIcon>
  <ListItemText primary="Auctions" />
  {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
</ListItem>
<Collapse in={open} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <Link className='' to="list-auctions/">
      <ListItem className=''>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="List Auctions" />
      </ListItem>
    </Link>
    <Link className='' to="create-auction/">
      <ListItem className=''>
        <ListItemIcon>
          <FilePlusIcon />
        </ListItemIcon>
        <ListItemText primary="Create Product" />
      </ListItem>
    </Link>
  </List>
</Collapse>

<ListSubheader>Applications</ListSubheader>
<Link className='' to="calendar/">
  <ListItem >
    <ListItemIcon>
      <CalendarIcon />
    </ListItemIcon>
    <ListItemText primary={'Calendar'} />
  </ListItem>
</Link>

<ListSubheader>Pages</ListSubheader>
<Link className='' to="account/">
  <ListItem>
    <ListItemIcon>
      <UserIcon />
    </ListItemIcon>
    <ListItemText primary={'Account'} />
  </ListItem>
</Link>
<Link className='' to="pricing/">
  <ListItem >
    <ListItemIcon>
      <DollarSignIcon />
    </ListItemIcon>
    <ListItemText primary={'Pricing'} />
  </ListItem>
</Link>

<a className='' href={'/'}>
  <ListItem onClick={handleLogout}>
    <ListItemIcon>
      <LogOutIcon />
    </ListItemIcon>
    <ListItemText primary={'logout'} />
  </ListItem>
</a>
</List>
</div>
)}
</Drawer>
</div>
</>
);
};

export default DashboardSidebarNavigation;


