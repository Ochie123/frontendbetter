import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Page from "../../../src/components/Page";

const PrivacyPolicyPage = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <Page title="Privacy Policy">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h2" : "h2"} color='blue'>
            Privacy Policy
          </Typography>
          <Typography variant="body1" align="justify" mt={2}>
            At Cars Bids, we value and respect the privacy of our
            users. This Privacy Policy outlines how we collect, use, and
            protect your personal information when you use our car auctions
            website. By using our website, you agree to the collection and use
            of your personal information as described in this Privacy Policy.
            <br />
            <br />
            <strong>Information Collection</strong>
            <br />
            We may collect personal information from you when you register on
            our website, place a bid, or engage in other activities on our site.
            The information we collect may include your name, email address,
            contact information, and other relevant details necessary for the
            auction process. We implement appropriate security measures to
            protect your personal information from unauthorized access or
            disclosure.
            <br />
            <br />
            <strong>Information Usage</strong>
            <br />
            We use the collected information to facilitate and improve your
            auction experience. This may include providing personalized content,
            communicating with you about auctions or related services, and
            processing transactions. We may also use your information for
            research and analysis purposes to enhance our website's
            functionality and user experience.
            <br />
            <br />
            <strong>Information Sharing</strong>
            <br />
            We may share your personal information with trusted third parties
            who assist us in operating our website, conducting auctions, and
            providing related services. However, we do not sell, trade, or
            transfer your personal information to outside parties for marketing
            purposes without your consent.
            <br />
            <br />
            <strong>Information Security</strong>
            <br />
            We take reasonable precautions to protect your personal information
            and maintain the security of our website. However, please note that
            no method of transmission over the internet or electronic storage
            is completely secure. We cannot guarantee absolute security, and you
            provide your information at your own risk.
            <br />
            <br />
            <strong>Changes to the Privacy Policy</strong>
            <br />
            We reserve the right to update or modify this Privacy Policy at any
            time. Any changes will be posted on this page, and we encourage you
            to review this Privacy Policy periodically. Your continued use of
            our website after any modifications signify your acceptance of the
            updated Privacy Policy.
            <br />
            <br />
            <strong>Contact Information</strong>
            <br />
            If you have any questions or concerns about our Privacy Policy,
            please contact us using the provided contact information on our
            website.
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default PrivacyPolicyPage;