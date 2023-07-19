import React from "react"
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Page from "../../../src/components/Page"

const AboutPage = () => {
  const mobileDevice = useMediaQuery("(max-width:650px)")

  return (
    <Page title="About us">
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={mobileDevice ? "h4" : "h2"} color='blue'>
            Discover the Thrill of Auto Auctions!
          </Typography>
          <Typography variant="body1" align="center" mt={2}>
            Welcome to our car auction website, where the excitement never stops
            and the possibilities are endless. We pride ourselves on being the
            premier destination for car enthusiasts, offering a seamless and
            exhilarating auction experience like no other.
            <br />
            <br />
            Whether you're a seasoned collector, a first-time buyer, or simply
            someone looking for your dream car, we have it all. Our extensive
            inventory features a wide range of vehicles, from classic beauties
            to the latest luxury models, all ready to be bid on and driven away.
          </Typography>
          <Box mt={4}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5" color='red'>Our Mission</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  At our car auction website, we are on a mission to
                  revolutionize the way people buy and sell cars. We believe in
                  creating an inclusive and transparent platform that connects
                  buyers and sellers from all corners of the globe. Our aim is
                  to provide a trusted environment where enthusiasts can pursue
                  their automotive passions, find exceptional deals, and build
                  lasting connections within the automotive community.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5" color='red'>Why Choose Us?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  With us, you gain access to a world of possibilities. Here's
                  why you should choose our car auction website:
                  <br />
                  <br />
                  ✅ <b>Vast Selection:</b> Our diverse inventory is constantly updated
                  with high-quality vehicles, giving you plenty of options to
                  explore and bid on.
                  <br />
                  ✅ <b>Trustworthy Sellers:</b> We thoroughly vet our sellers to ensure
                  they meet our strict standards of professionalism and
                  integrity, providing you with a safe and secure buying
                  experience.
                  <br />
                  ✅ <b>User-Friendly Interface:</b> Our intuitive platform is designed
                  to make the auction process seamless and enjoyable, allowing
                  you to navigate listings, place bids, and track your favorite
                  vehicles with ease.
                  <br />
                  ✅ <b>Unmatched Expertise:</b> Our team of automotive enthusiasts and
                  industry experts are always available to provide assistance,
                  answer your questions, and guide you through every step of the
                  auction process.
                  <br />
                  ✅ <b>Competitive Prices:</b> With our auction model, you have the
                  opportunity to find incredible deals and purchase vehicles at
                  competitive prices that suit your budget.
                  <br />
                  <br />
                  Join us today and embark on an extraordinary journey filled
                  with the thrill of car auctions, exceptional vehicles, and
                  unforgettable moments. Your dream car awaits!
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default AboutPage
