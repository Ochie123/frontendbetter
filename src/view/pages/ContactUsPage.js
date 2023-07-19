import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";


import Page from "../../../src/components/Page";

const ContactUsPage = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <Page title="Contact Us">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h2" : "h2"} color='blue'>
            Contact Us
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
            We would love to hear from you! If you have any questions, feedback,
            or inquiries, please don't hesitate to reach out to our dedicated
            team. We are here to assist you and provide the best possible
            support.
          </Typography>
          <Box mt={4}>
            You can send us a message anytime through our social channels, or send us a direct email at
            <br/>
            <Typography color='blue' fontSize="xl3" fontWeight="md" my={1}>
                officialcarsbids@gmail.com 
            </Typography>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default ContactUsPage;