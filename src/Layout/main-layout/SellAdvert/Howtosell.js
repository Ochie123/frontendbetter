import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Page from "../../../../src/components/Page";

const HowToSell = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <Page title="How to Sell">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h4" : "h2"} color='blue'>
            Sell Your Vehicle With Ease
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
            Are you ready to part ways with your vehicle? Selling your car can
            be a breeze with our user-friendly platform and robust set of tools
            designed to streamline the listing process. By choosing to sell
            through our car auction website, you unlock numerous benefits and
            gain access to a vast audience of potential buyers.
            <br />
            <br />
            Our Tools for Sellers:
            <br />
            <br />
            ✅ <b>Listing Assistance:</b> Our intuitive listing creation tool will guide
            you through the process, ensuring that you include all the necessary
            details and present your vehicle in the best light.
            <br />
            ✅ <b>High-Quality Imagery:</b> Showcase your car's features and
            craftsmanship with stunning, high-resolution images to attract
            potential buyers. We recommend using unedited photos of your car. Blurry images will lower the confidence score of your car.
            <br />
            ✅ <b>Detailed Descriptions:</b> Craft compelling and accurate descriptions
            that highlight your vehicle's unique selling points, history,
            maintenance records, and any additional features.
            <br />
            ✅ <b>Pricing Guidance:</b> Take advantage of our pricing insights and market
            analysis to set a competitive yet fair price for your vehicle. Our insights help you to set a reasonable starting bid and reserve price on the go!
            <br />
            ✅ <b>Auction Format:</b> Benefit from the excitement and competitive nature
            of auctions, which can drive up the value of your car and lead to
            favorable outcomes.
            <br />
            <br />
            By listing your vehicle with us, you tap into our extensive network
            of car enthusiasts and potential buyers, ensuring that your listing
            reaches a wide audience. Our platform provides a trusted and secure
            environment, giving buyers the confidence they need to make a
            purchase. Sell your vehicle with ease and let us help you find the
            right buyer for your cherished automobile.
          </Typography>
          <Box mt={4}>
          <Box mt={4}>
          <img
                src="https://i.ibb.co/mNd3Gh0/awideselection.png"
                alt="Promotional"
                style={{ width: "100%", border:"0", height: "100%" }}
              />
          </Box>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default HowToSell;