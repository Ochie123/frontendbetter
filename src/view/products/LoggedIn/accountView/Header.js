import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Typography,
  Breadcrumbs,
  Link,

  Box,
} from '@mui/material';
import NavigateNextIcon from  "@mui/icons-material/NavigateNext"


const Header = ({ className, ...rest }) => {
 

  return (
    <div className="" {...rest}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" to="/reports" component={RouterLink}>
          Dashboard
        </Link>
        <Box>
          <Typography variant="body1" color="inherit">
            Account
          </Typography>
        </Box>
      </Breadcrumbs>
      <Typography variant="h4" color="textPrimary">
        Settings
      </Typography>
    </div>
  );
};


export default Header;
