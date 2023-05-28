import React, { ReactNode } from 'react';

import NavigationBar from './NavigationBar'
import Footer from './Footer';
import Footers from './footers';

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
        <Footer/>
        )}
        </>
    )
}

export default MainLayout;