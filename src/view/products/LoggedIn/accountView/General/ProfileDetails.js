import React from "react"
import { Link as RouterLink } from "react-router-dom"
import clsx from "clsx"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,

} from '@mui/material';

const ProfileDetails = ({ className, user, ...rest }) => {
 
  return (
    <Card className="" {...rest}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar className="" src={user?.avatar} />
          <Typography
            className=""
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {user?.username}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Your tier:<h3>hello</h3> {user?.username}
            <Link component={RouterLink} to="/pricing">
              {user?.tier}
            </Link>
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="text">
          Remove picture
        </Button>
      </CardActions>
    </Card>
  )
}



export default ProfileDetails;
