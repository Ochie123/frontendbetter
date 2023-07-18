import React from "react"
import { Container } from "@mui/material"
import Typography from "@mui/joy/Typography"
import Box from "@mui/joy/Box"
import Page from "../../../../src/components/Page"

const OurSafeguards = () => {
  return (
    <Page title="Our Safeguards">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            fontSize="48px"
            borderRadius=""
            px={0.5}
            mr={0.5}
            sx={theme => ({
              ...theme.variants.soft.warning,
              color: "danger.400",
              verticalAlign: "text-top"
            })}
          >
            Simple And Secure Bidding Process 🔒
          </Typography>

          <Typography variant="body1" align="center" mt={2}>
            At our car auction website, we prioritize the safety and security of
            all our users. We have implemented a range of safeguards to ensure
            that your bidding experience is smooth, transparent, and worry-free.
            Whether you're a seasoned bidder or new to the auction scene, you
            can participate with confidence, knowing that your interactions and
            transactions are protected by our stringent security measures.
            <br />
            <br />
            Our Safeguards Include:
            <br />
            <br />
            ✅ User Verification: Before engaging in bidding, we verify the
            identities of all users to maintain a trustworthy community and
            prevent fraudulent activities.
            <br />
            ✅ Bid Tracking: Stay informed and on top of your bids with our
            user-friendly bid tracking feature. Monitor the progress of your
            bids and receive real-time notifications to keep you in the loop.
            <br />
            ✅ Transparent Auctions: Our auctions are conducted transparently,
            with all relevant information clearly presented. You can access
            comprehensive details about each vehicle, including its condition,
            history, and any additional documents provided by the seller.
            <br />
            ✅ Secure Payments: We facilitate secure and encrypted payment
            transactions, ensuring that your financial information remains
            protected.
            <br />
            ✅ Dispute Resolution: In the rare event of a dispute, we have a
            fair and impartial resolution process in place to address any
            concerns and maintain a harmonious environment for all users.
            <br />
            ✅ Customer Support: Our dedicated customer support team is always
            available to address your inquiries, provide guidance, and offer
            assistance throughout the bidding process.
            <br />
            <br />
            <Typography
              fontSize=""
              borderRadius=""
              px={0.5}
              mr={0.5}
              sx={theme => ({
                ...theme.variants.soft.warning,
                color: "primary.400",
                verticalAlign: "text-top"
              })}
            >
              Embrace the excitement of car auctions with peace of mind, knowing
              that your safety and security are at the forefront of our
              platform. Join us today and experience the joy of finding your
              dream car or selling your cherished vehicle in a secure and
              trustworthy marketplace.
            </Typography>
          </Typography>
          <Box mt={4}>
            <img
              src="https://i.ibb.co/mNd3Gh0/awideselection.png"
              alt="Promotional"
              style={{ width: "100%", border: "0", height: "100%" }}
            />
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default OurSafeguards
