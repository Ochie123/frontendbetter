import React, { ReactNode } from 'react';

import NavigationBar from './NavigationBar'
import Footer from './Footer';
import './Layout.scss'
const MainLayout = ({ children } ) => {

    return (
        <>
        <NavigationBar/>
        <div className="true">{children}</div>
        <Footer/>

        </>
    )
}

export default MainLayout;