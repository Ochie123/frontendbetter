import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";

import Page from "../../../src/components/Page";

const BlogPage = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <Page title="Blog">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h2" : "h2"} color='blue'>
            Welcome to Our Blog
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
            Explore our blog for the latest news, tips, and insights about the
            world of cars, auctions, and everything automotive. Our blog is a
            treasure trove of articles written by our team of experts and
            passionate car enthusiasts.
            <br />
            <br />
            Whether you're looking for advice on buying or selling a vehicle,
            information about upcoming events and industry trends, or simply
            seeking inspiration for your next automotive adventure, our blog has
            something for everyone.
          </Typography>
          <Box mt={4}>
          <br/>
            <Typography textColor="primary.400" fontSize="xl3" fontWeight="md" my={1}>
               Please come back. We'll constantly update this page.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default BlogPage;