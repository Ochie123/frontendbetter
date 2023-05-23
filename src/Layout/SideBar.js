import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { createStyles, makeStyles } from '@mui/icons-material';
import {Drawer} from '@mui/material';
import {List }from '@mui/material';
import { ListItem} from '@mui/material';
import {ListItemIcon }from '@mui/material';
import {ListItemText} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import "./SideBar.css";
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
  User as UserIcon,
  DollarSign as DollarSignIcon,
  LogOut as LogOutIcon,
} from 'react-feather';



const SideBar = () => {
  const mobileDevice = useMediaQuery('(max-width:650px)');
  const [open, setOpen] = useState(false);

  useEffect(() => {}, []);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="root">
        <Drawer
          className="drawer"
          variant="permanent"
     
          anchor="right"
        >
        { !mobileDevice && (
             <Box p={2}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="User"
                  className=""
                  src=""
                />
              </Box>
              <Box mt={2} textAlign="center">
                <Typography>Mr. Arrow</Typography>
                <Typography variant="body2" color="textSecondary">
                  Your tier: Premium
                </Typography>
              </Box>
            </Box>
          )}
          <Divider />
          <div className='drawerContainer'>
            <List>
              <ListSubheader>Reports</ListSubheader>
              <Link className="link" to="/">
                <ListItem>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItem>
              </Link>

              <ListSubheader>Management</ListSubheader>
              <ListItem onClick={handleClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ListItem>
              <Divider />
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link className="link" to="list-auctions/">
                    <ListItem className="nested">
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List Products" />
                    </ListItem>
                  </Link>
                  <Link className="link" to="list-products/">
                    <ListItem className="nested">
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List Products" />
                    </ListItem>
                  </Link>
                  <Link className="link" to="create-product/">
                    <ListItem className="nested">
                      <ListItemIcon>
                        <FilePlusIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create Product" />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>

              <a className="link" href={'/'}>
                <ListItem>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText primary={'logout'} />
                </ListItem>
              </a>
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default SideBar;

