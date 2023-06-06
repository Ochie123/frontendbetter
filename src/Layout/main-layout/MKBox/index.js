/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MKBox
import MKBoxRoot from "./MKBoxRoot";

const MKBox = forwardRef(
  ({  ...rest }, ref) => (
    <MKBoxRoot
      {...rest}
      ref={ref}
      ownerState={{  }}
    />
  )
);

// Setting default values for the props of MKBox
MKBox.defaultProps = {

};

// Typechecking props for the MKBox
MKBox.propTypes = {

};

export default MKBox;
