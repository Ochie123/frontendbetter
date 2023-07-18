import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Button from '@mui/joy/Button';
import { Link} from "react-router-dom";
import Page from "../../../../src/components/Page";

const OurCollection = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <Page title="Our Collection">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h4" : "h2"} color='blue'>
            Discover Our Diverse Collection
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
            Welcome to our extensive car collection! Here, automotive dreams
            come to life as we offer an unparalleled selection of top-tier
            vehicles from various eras and styles. Whether you're an avid
            collector or an enthusiast seeking a special ride, our meticulously
            curated collection has something to cater to every taste.
            <br />
            <br />
            Our passion for cars drives us to continually search for the most
            exquisite and unique automobiles to add to our inventory. From
            classic beauties with timeless elegance to cutting-edge modern
            masterpieces, each vehicle we present carries a story and a legacy
            of engineering excellence.
            <br />
            <br />
            We take great pride in providing our customers with access to
            vehicles that embody the artistry and craftsmanship of the
            automotive industry. With unwavering dedication, we strive to
            connect automotive enthusiasts with the cars they've always
            envisioned driving.
          </Typography>
          <Box mt={4}>
          <Link to={`/auctions/`}>
          <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Browse
        </Button>
        </Link>
          </Box>
          <Box mt={4}>
          <img
                src="https://i.ibb.co/mNd3Gh0/awideselection.png"
                alt="Promotional"
                style={{ width: "100%", border:"0", height: "100%" }}
              />
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default OurCollection;