import React from "react"
import { Box, Typography, Divider,useMediaQuery } from "@mui/material"
import Page from '../../components/Page';
//import NewlyListed from './NewlyListed';
import EndingSoon from './EndingSoon';
import PromotionalFull from './PromotionalFull';
import SellAdverts from "../../Layout/main-layout/SellAdvert/SellAdverts";
import Faq from "../../Layout/main-layout/FAQ/Faq";


import CarTypes from "./Home/CarTypes";


const Main = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)")

  return (
    <>
    <Page title="Home">
    {mobileDevice ? (
 
    <Box >
          <Typography variant={mobileDevice ? 'h4' : 'h1'}>
           
          </Typography>
         <PromotionalFull/>
         <CarTypes/>
         <SellAdverts/>
         <Faq/>
        <EndingSoon/>   
    </Box>
  
    ) : (
        <>
        <PromotionalFull/>
        <div class="container my-5">
          <CarTypes/>
          <SellAdverts/>
          <Faq/>
        <EndingSoon/>
        <Divider />
        </div>
        </>
)}
    </Page>

    </>
  )
}

export default Main
