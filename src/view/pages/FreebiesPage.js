import React from 'react';
import { Box, Container, Typography, useMediaQuery, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Page from '../../../src/components/Page';

const FreebiesPage = () => {
  const mobileDevice = useMediaQuery('(max-width:650px)');

  return (
    <Page title="Freebies">
      <Container>
        <Box
   
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={mobileDevice ? 'h1' : 'h1'} color='blue'>
            Welcome to the Car Auction Freebies! 🚗💰
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
            Are you new to car auctions and bidding? Get ready to explore a world of exciting opportunities!
            <br />
            Our Freebies section offers valuable resources to help you navigate the car auction landscape with confidence.
            <br />
            Discover expert tips, guides, and templates that will assist you in making informed decisions during the bidding process.
            <br />
            Learn about different auction formats, best practices for evaluating vehicles, and strategies for winning bids.
            <br />
            Whether you're a car enthusiast, a first-time buyer, or a seasoned bidder, our freebies have something for everyone.
            <br />
            Equip yourself with the knowledge and tools necessary to succeed in the fast-paced world of car auctions.
            <br />
            Start exploring our freebies today and take your bidding skills to the next level!
          </Typography>
          <Box mt={4}>
            <Typography variant={mobileDevice ? 'h5' : 'h4'}>Frequently Asked Questions:</Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq1-content" id="faq1-header">
                <Typography variant="subtitle1">How do I participate in a car auction?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Participating in a car auction typically requires registering as a bidder, submitting necessary documentation, and understanding the auction rules and procedures. It's recommended to research and choose reputable auction platforms or physical auction houses. Read our detailed guide on participating in car auctions for step-by-step instructions.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq2-content" id="faq2-header">
                <Typography variant="subtitle1">How can I evaluate the condition of a vehicle in an auction?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Evaluating the condition of a vehicle in an auction can be challenging, but there are several factors to consider. Examine the provided vehicle information, including photos and descriptions. If possible, inspect the vehicle in person or hire a professional inspection service. Research the vehicle's history using its VIN number. Additionally, learn about the auction's grading system or condition reports. Our comprehensive vehicle evaluation guide can provide you with more detailed information.
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* Add more FAQs as needed */}
          </Box>
        </Box>
      
      </Container>
    </Page>
    
  );

 
};

export default FreebiesPage;