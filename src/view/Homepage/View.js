import React from "react"
import { Box, Container, Typography, useMediaQuery } from "@mui/material"
import Page from '../../components/Page';
import NewlyListed from './NewlyListed';
import EndingSoon from './EndingSoon';
import PromotionalFull from './PromotionalFull';


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
        <NewlyListed/>
        <EndingSoon/>   
    </Box>
  
    ) : (
        <>
        <PromotionalFull/>
        <NewlyListed/>
        <EndingSoon/>
        </>
)}
    </Page>

    </>
  )
}

export default Main
