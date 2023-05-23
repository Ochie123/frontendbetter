import React from 'react';
import Button from '../../others/Button'
import './Advert.scss'

export default function Advert() {
  return (
   
    <div className="main-banner-home flex items-center">
      
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-2">
        <div />
        <div className="text-center md:text-left px-2 ">
          <h2 className="h1 ">
            Buy/Sell
        
            Car or Property
            
          </h2>
          <Button url="/list" title="BUY" variant="primary" />
          <Button url="/list" title="LIST" variant="primary" />
        </div>
      </div>
   
    </div>
   
  );
}

