import React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Page from "../../../src/components/Page";

const KnowledgeCenterPage = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <Page title="Our Knowledge Center">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h2" : "h2"} color='blue'>
            Knowledge Center
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
            Welcome to our Knowledge Center, a valuable resource for expanding
            your understanding of the car auction world. Whether you're a
            seasoned bidder, a seller, or a car enthusiast, our knowledge center
            provides a wealth of information to help you navigate the auction
            process, make informed decisions, and stay updated on industry
            trends.
          </Typography>
          <Box mt={4}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  How to Bid Successfully
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Bidding successfully in a car auction requires strategy and
                  preparation. Learn valuable tips and techniques on how to
                  research vehicles, set bidding limits, and make winning bids.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  Selling Your Vehicle
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Discover the best practices for selling your vehicle in a car
                  auction. From creating appealing listings to setting reserves
                  and managing buyer inquiries, learn how to optimize your
                  selling experience.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  Tips for Vehicle Inspections
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Inspecting a vehicle before bidding is crucial for making
                  informed decisions. Explore our expert tips on how to conduct
                  thorough inspections and identify potential issues or
                  red flags.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <br/>
            Keep an eye on our blog page to learn the best tips.
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default KnowledgeCenterPage;