import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";

import Page from "../../../src/components/Page";

const AffiliateProgramPage = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <Page title="Our Affiliate Program">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h1" : "h1"} color='blue'>
            Our Affiliate Program
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
          ✅ Join our affiliate program and have the opportunity to earn
            commissions by referring others to our car auction website.
            <br />
            <br />
            
            <Typography color='blue' fontSize="xl3" fontWeight="xl" my={1}>
            Earn Commissions:
            </Typography>
            <br />
            <br />
            Generous Commissions:
            <br/>
            ✅ Whenever someone joins our website or makes a successful sale
            through your referral, you can earn a generous commission based on
            the transaction value.
            <br />
            <br />
            ✅ Take advantage of this opportunity to monetize your network and
            passion for cars. By sharing our website link with friends,
            family, or car enthusiasts, you not only provide them with access to
            our exciting auction platform but also have the potential to earn
            commissions for each successful referral or sale they make. You can claim it anytime.
            <br />
            <br />
            ✅ Start earning today and become part of our growing community of
            affiliates!
          </Typography>
          <Box mt={4}>
            {/* Add any additional information or resources for affiliates */}
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default AffiliateProgramPage;