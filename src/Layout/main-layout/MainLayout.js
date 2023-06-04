import React from 'react';

import NavigationBar from './NavigationBar'
import Footer from './Footer';
import Footer2 from './Footer/Footer2';


import './Layout.scss'
const MainLayout = ({ children } ) => {
    const token = localStorage.getItem('token');

    return (
        <>

        <NavigationBar/>
        <div className="true">{children}</div>

        {token ? (
        <Footer/>
        ): (
         
        <Footer2/>
        )}
        </>
    )
}

export default MainLayout;