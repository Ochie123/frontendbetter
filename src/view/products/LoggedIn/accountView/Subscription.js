import React from "react"
import { Link as RouterLink } from "react-router-dom"
//import { useSelector } from "react-redux"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Paper,
  Typography,

} from "@mui/material"

const Subscription = ({ className, ...rest }) => {
  //const classes = useStyles()
//  const {
   // profile: { subscription }
  //} 

  return (
    <Card className="" {...rest}>
      <CardHeader title="Manage your subscription" />
      <Divider />
      <CardContent>
        <Paper variant="outlined">
          <Box className="">
            <div>
              <Typography display="inline" variant="h4" color="textPrimary">
            1000 Ksh
              </Typography>
              <Typography display="inline" variant="subtitle1">
                /mo
              </Typography>
            </div>
            <Box display="flex" alignItems="center">
              <img
                alt="Product"
                className=""
                src="images/products/product_standard.svg"
              />
              <Typography variant="overline" color="textSecondary">
                ""
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box className="">
            <div>
            </div>
            <div>
              <Typography variant="body2" color="textPrimary">
                {`20 ads left`}
              </Typography>
            </div>
            <div>
              { (
                <Typography variant="body2" color="textPrimary">
                  Analytics dashboard
                </Typography>
              )}
              {  (
                <Typography variant="body2" color="textPrimary">
                  Email alerts
                </Typography>
              )}
            </div>
          </Box>
        </Paper>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button size="small" color="secondary" variant="contained">
            Upgrade plan
          </Button>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            The refunds don&apos;t work once you have the subscription, but you
            can always{" "}
            <Link color="secondary" component={RouterLink} to="#">
              Cancel your subscription
            </Link>
            .
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}



export default Subscription
