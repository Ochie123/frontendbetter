// @mui material components
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";

function SellAdvert({image, title}) {
  return (
<>
        <Box sx={{ display: 'flex', justifyContent: 'center',
        py: 1 }}>
      <Card variant="outlined" sx={{ width: 'auto', '@media (max-width: 600px)': {
            width: '360px', // Set width to 100% for screens with max width of 600px (mobile phones)
          }, }}>
      <MKBox position="relative" borderRadius="lg" mx={2} mt={-3}>
        <MKBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          width="100%"
          position="relative"
          zIndex={1}
        />
        <MKBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top={0}
          image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          sx={{
            backgroundImage:`url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </MKBox>
      <MKBox p={3} mt={-1} textAlign="center">
        <MKTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
        Sell Your Vehicle with Ease
        </MKTypography>
        <MKBox mt={1} mb={3}>
          <MKTypography variant="body2" component="p" color="text">
          See our tools available to assist you in the listing process and benefits of reaching a large audience of potential buyers..
          </MKTypography>
        </MKBox>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Find out more
        </Button>
      </MKBox>
         </Card>
       
         </Box>

         <Box sx={{ display: 'flex',  justifyContent: 'center',
        py: 1, }}>
       <Card variant="outlined" sx={{ width: 'auto', '@media (max-width: 600px)': {
            width: '360px', // Set width to 100% for screens with max width of 600px (mobile phones)
          }, }}>
       <MKBox position="relative" borderRadius="lg" mx={2} mt={-3}>
        <MKBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          width="100%"
          position="relative"
          zIndex={1}
        />
        <MKBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top={0}
          image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          sx={{
            backgroundImage:`url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </MKBox>
      <MKBox p={3} mt={-1} textAlign="center">
        <MKTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
        Simple and Secure Bidding Process
        </MKTypography>
        <MKBox mt={1} mb={3}>
          <MKTypography variant="body2" component="p" color="text">
          Learn our safeguards in place to ensure a smooth experience, bid tracking, and payment security measures.
          </MKTypography>
        </MKBox>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Find out more
        </Button>
      </MKBox>

   </Card>
       </Box>

       <Box sx={{ display: 'flex',  justifyContent: 'center',
        py: 1, }}>
      <Card variant="outlined" sx={{ width: 'auto', '@media (max-width: 600px)': {
            width: '360px', // Set width to 100% for screens with max width of 600px (mobile phones)
          }, }}>
      <MKBox position="relative" borderRadius="lg" mx={2} mt={-3}>
        <MKBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          width="100%"
          position="relative"
          zIndex={1}
        />
        <MKBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top={0}
          image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          sx={{
            backgroundImage:`url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </MKBox>
      <MKBox p={3} mt={-1} textAlign="center">
        <MKTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
        Discover a Wide Selection of Vehicles
        </MKTypography>
        <MKBox mt={1} mb={3}>
          <MKTypography variant="body2" component="p" color="text">
          Learn the variety of vehicles available for auction on our website and the diverse options and choices for potential buyers.
          </MKTypography>
        </MKBox>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Find out more
        </Button>
      </MKBox>
       </Card>
        </Box>
          </>
  );
}

export default SellAdvert;