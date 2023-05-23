import React from "react"
import { Link as RouterLink } from "react-router-dom"
import clsx from "clsx"
import NavigateNextIcon from  "@mui/icons-material/NavigateNext"
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  createStyles,

} from "@mui/material"
import {
  PlusCircle as PlusCircleIcon,
  Download as DownloadIcon,
  Upload as UploadIcon
} from "react-feather"

const Header = ({ className, ...rest }) => {
  const {classes} = useStyles(createStyles)

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx( className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/reports"
            component={RouterLink}
          >
            Dashboard
          </Link>

          <Box>
            <Typography variant="body1" color="inherit">
              List Auctions
            </Typography>
          </Box>
        </Breadcrumbs>
        <Typography variant="h4" color="textPrimary">
          All Auctions
        </Typography>
        <Box mt={2}>
          <Button
            className=""
            startIcon={
              <SvgIcon fontSize="small">
                <UploadIcon />
              </SvgIcon>
            }
          >
            Import
          </Button>
          <Button
            className=""
            startIcon={
              <SvgIcon fontSize="small">
                <DownloadIcon />
              </SvgIcon>
            }
          >
            Export
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          className=""
          component={RouterLink}
          to="/create-auction"
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Auction
        </Button>
      </Grid>
    </Grid>
  )
}

const useStyles = (theme) =>  ({
  root: {},

  
})

export default Header
