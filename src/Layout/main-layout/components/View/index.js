import { useState, useEffect } from "react";

// prop-types is a library for type checking of props
import PropTypes from "prop-types";

// react-copy-to-clipboard componen
// @mui material components
import Grid from "@mui/material/Grid";


// Material Kit 2 React components
import MKBox from "../../MKBox";

import MKTypography from "../../MKTypography";

// Material Kit 2 React base styles

function View({ children, code, title, height, ...rest }) {


  const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  return (
    <MKBox
      width="100%"
      position="relative"
      borderRadius="xl"
      shadow="lg"
      mb={12}
      sx={{ overflow: "hidden" }}
      {...rest}
    >
      <MKBox
        px={3}
    
      >
        <Grid container spacing={2} justifyContent="space-between" py={1}>
          <Grid item xs={12} lg={3}>
            <MKTypography variant="body1" pt={0.5}>
              {title}
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={3}>
    
          </Grid>
        </Grid>
      </MKBox>
      <MKBox display={activeTab === 0 ? "block" : "none"}>
        <MKBox width="100%" p={3}>
          <MKBox
            bgColor="grey-100"
            width="100%"
            height={height}
            maxHeight="40rem"
            borderRadius="xl"
            sx={{ overflowX: "hidden", overflowY: "scroll" }}
          >
            {children}
          </MKBox>
        </MKBox>
      </MKBox>
      <MKBox display={activeTab === 1 ? "block" : "none"} p={3}>
        <MKBox
          bgColor="grey-100"
          position="relative"
          width="100%"
          borderRadius="xl"
          sx={{ overflow: "hidden" }}
        >
 
   
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the View
View.defaultProps = {
  height: "auto",
};

// Typechecking props for the View
View.propTypes = {
  children: PropTypes.node.isRequired,
  code: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
};

export default View;
