import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";

import FaqCollapse from '../components/FaqCollapse'
  

function Faq() {
  const [collapse, setCollapse] = useState(false);

  return (
  
    <MKBox component="section" py={12}>
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} my={6}>
          <MKTypography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Frequently Asked Questions
          </MKTypography>
    
        </Grid>
        <Grid item xs={12} md={10}>
          <FaqCollapse
            title="How does the car auction process work?"
            open={collapse === 1}
            onClick={() => (collapse === 1 ? setCollapse(false) : setCollapse(1))}
          >
          The car auction process typically involves registering as a bidder, browsing available vehicles, placing bids, and competing with other bidders. The highest bidder at the end of the auction wins the vehicle.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="What are the bidding options available?"
            open={collapse === 2}
            onClick={() => (collapse === 2 ? setCollapse(false) : setCollapse(2))}
          >
          Most car auction websites offer different bidding options such as live bidding, proxy bidding, and timed auctions. Live bidding allows you to participate in real-time auctions, proxy bidding enables you to set a maximum bid, and timed auctions have a set duration for placing bids.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="Can I inspect the vehicles before bidding?"
            open={collapse === 3}
            onClick={() => (collapse === 3 ? setCollapse(false) : setCollapse(3))}
          >
           Yes, car auction websites usually provide an opportunity to inspect the vehicles before bidding. They may have designated inspection days or allow you to schedule an appointment to view the vehicles in person.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="What condition are the auctioned cars in?"
            open={collapse === 4}
            onClick={() => (collapse === 4 ? setCollapse(false) : setCollapse(4))}
          >
          The condition of the auctioned cars can vary. It's essential to review the vehicle descriptions, including any disclosed issues or damages, provided by the auction website. Some auctions may offer cars in various conditions, such as salvage, used, or like-new.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="Are there any fees associated with participating in the auction?"
            open={collapse === 5}
            onClick={() => (collapse === 5 ? setCollapse(false) : setCollapse(5))}
          >
          Yes, there may be fees associated with participating in the car auction. Common fees include registration fees, buyer's premiums (a percentage of the winning bid), and transaction fees. Make sure to review the auction website's terms and conditions for detailed information on fees.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="How do I make payment for a vehicle I won?"
            open={collapse === 6}
            onClick={() => (collapse === 6 ? setCollapse(false) : setCollapse(6))}
          >
          After winning a vehicle at auction, you will typically be required to make a payment within a specified timeframe. Accepted payment methods may include bank transfers, credit/debit cards, or online payment platforms. The auction website will provide instructions on how to complete the payment.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="What happens after I win a car at auction?"
            open={collapse === 7}
            onClick={() => (collapse === 7 ? setCollapse(false) : setCollapse(7))}
          >
          Once you have made the payment for the vehicle, you will need to arrange for its transportation or pickup. The auction website may have partnerships with transport companies or provide assistance in coordinating the logistics.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="Can I sell a car through the auction website?"
            open={collapse === 8}
            onClick={() => (collapse === 8 ? setCollapse(false) : setCollapse(8))}
          >
          Some car auction websites also allow individuals to sell their vehicles. If you are interested in selling a car, you may need to register as a seller, provide necessary details about the vehicle, and follow the auction website's guidelines for listing and selling.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="Is there a warranty or guarantee for the auctioned vehicles?"
            open={collapse === 9}
            onClick={() => (collapse === 9 ? setCollapse(false) : setCollapse(9))}
          >
          Typically, auctioned vehicles are sold "as-is," without any warranty or guarantee. It's crucial to review the vehicle's condition report and any available vehicle history to make an informed decision. Some auctions may offer optional inspection or warranty services for an additional cost.
          </FaqCollapse>
          <Divider />
          <FaqCollapse
            title="What happens if I encounter issues with a purchased vehicle?"
            open={collapse === 10}
            onClick={() => (collapse === 10 ? setCollapse(false) : setCollapse(10))}
          >
          Depending on the auction website's policies, they may have a dispute resolution process in place. If you encounter significant discrepancies or undisclosed problems with the vehicle, you should contact the auction website's customer support for assistance and follow their guidelines for dispute resolution.
          </FaqCollapse>
          <Divider />
        </Grid>
      </Grid>
    </Container>
  </MKBox>
 
  );
}

export default Faq;
