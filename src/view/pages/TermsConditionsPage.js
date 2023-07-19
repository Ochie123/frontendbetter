import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Page from "../../../src/components/Page";

const TermsConditionsPage = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <Page title="Terms and Conditions">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h1" : "h1"} color='blue'>
            Terms and Conditions
          </Typography>
          <Typography variant="body1" align="justify" mt={2}>
            These terms and conditions outline the rules and regulations for
            using our car auctions website. By accessing this website, we
            assume you accept these terms and conditions in full. Do not
            continue to use our website if you do not agree to all the terms
            and conditions stated on this page.
            <br />
            <br />
            The following terminology applies to these Terms and Conditions,
            Privacy Statement, and Disclaimer Notice and any or all
            Agreements: "Client," "You," and "Your" refer to you, the person
            accessing this website and accepting the Company's terms and
            conditions. "The Company," "Ourselves," "We," "Our," and "Us," refer
            to our Company. "Party," "Parties," or "Us," refer to both the
            Client and ourselves, or either the Client or ourselves. All terms
            refer to the offer, acceptance, and consideration of payment
            necessary to undertake the process of our assistance to the Client
            in the most appropriate manner, whether by formal meetings of a
            fixed duration or any other means, for the express purpose of
            meeting the Client's needs in respect to the provision of the
            Company's stated services/products, in accordance with and subject
            to prevailing law.
            <br />
            <br />
            <strong>License</strong>
            <br />
            Unless otherwise stated, our Company and/or its licensors own the
            intellectual property rights for all material on this website. All
            intellectual property rights are reserved. You may view and/or print
            pages from this website for your own personal use, subject to
            restrictions set in these terms and conditions.
            <br />
            <br />
            <strong>Restrictions</strong>
            <br />
            You are specifically restricted from all of the following:
            <ul>
              <li>
                publishing any website material in any other media without our
                prior written consent;
              </li>
              <li>
                selling, sublicensing, and/or otherwise commercializing any
                website material;
              </li>
              <li>
                publicly performing and/or showing any website material without
                our prior written consent;
              </li>
              <li>
                using this website in any way that is or may be damaging to this
                website;
              </li>
              <li>
                using this website in any way that impacts user access to this
                website;
              </li>
              <li>
                using this website contrary to applicable laws and regulations,
                or in any way may cause harm to the website, or to any person or
                business entity;
              </li>
              <li>
                engaging in any data mining, data harvesting, data extracting,
                or any other similar activity in relation to this website;
              </li>
              <li>
                using this website to engage in any advertising or marketing.
              </li>
            </ul>
            <br />
            <strong>Disclaimer</strong>
            <br />
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties, and conditions relating to our website
            and the use of this website (including, without limitation, any
            warranties implied by law in respect to satisfactory quality,
            fitness for purpose, and/or the use of reasonable care and skill).
            Nothing in this disclaimer will:
            <ul>
              <li>
                limit or exclude our or your liability for death or personal
                injury resulting from negligence;
              </li>
              <li>
                limit or exclude our or your liability for fraud or fraudulent
                misrepresentation;
              </li>
              <li>
                limit any of our or your liabilities in any way that is not
                permitted under applicable law; or
              </li>
              <li>
                exclude any of our or your liabilities that may not be excluded
                under applicable law.
              </li>
            </ul>
            The limitations and exclusions of liability set in this section and
            elsewhere in this disclaimer: (a) are subject to the preceding
            paragraph; and (b) govern all liabilities arising under the
            disclaimer, including liabilities arising in contract, in tort, and
            for breach of statutory duty.
            <br />
            <br />
            <strong>Changes to the Terms and Conditions</strong>
            <br />
            We reserve the right, at our sole discretion, to modify or replace
            these terms and conditions at any time. By continuing to use this
            website after any revisions become effective, you agree to be bound
            by the revised terms and conditions. If you do not agree to the new
            terms and conditions, please stop using the website.
            <br />
            <br />
            <strong>Contact Information</strong>
            <br />
            If you have any questions or concerns regarding these terms and
            conditions, please contact us using the provided contact information
            on our website.
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default TermsConditionsPage;