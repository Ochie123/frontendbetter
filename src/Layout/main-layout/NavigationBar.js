import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { Link} from "react-router-dom";
import { useSelector } from 'react-redux';


import { RootState } from '../../store/reducers';

import HeaderProfile from '../../components/Header-Profile';
import { useMediaQuery } from "@mui/material"


//import { useAllCategories } from '../data';
//import Category from '../view/categories/Category';

//import DashboardSidebarNavigation from '../DashboardSidebarNavigation.js'

//const pages = ['Products', 'Pricing', 'Blog'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const token = localStorage.getItem('token');
  //console.log(token);

  const { claims } = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profile)


  console.log(claims)

  const mobileDevice = useMediaQuery('(max-width:650px)');



  return (
    <nav className="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-sticky py-3 start-0 end-0 bg-blue">

      <div className="container px-1">

        <div className="navbar-brand font-weight-bolder ms-lg-0 ">  <Link to={"/"}>Tradeking</Link>  </div>
  

          {token ? (
            <>
               <HeaderProfile/>
            </>
          ):(
            <div className="" id="">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <div className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 " aria-current="page" href="" rel="nofollow" target="_blank">
            <Link to={"/login"}>Login</Link>
            </div>
          </li>
          </ul>
        </div>
          )}
   
      </div>
    </nav>
  );
}
export default ResponsiveAppBar;