import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import NavigationBar from './NavigationBar'
import Footer from './Footer';
import Footer2 from './Footer/Footer2';


import './Layout.scss'
const MainLayout = ({ children } ) => {
    const token = localStorage.getItem('token');

    return (
        <>
        <NavigationBar/>
        <React.Fragment>
            
        <CssBaseline />
    
        <div className="true">{children}</div>

        {token ? (
        <Footer/>
        ): (
          <>
         <br/>
         <br/>
        <Footer2/>
        </>
        )}
        
      
    
      </React.Fragment>
      </>
      
    )
}

export default MainLayout;