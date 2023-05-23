import React from "react"
import { Grid, useMediaQuery } from  '@mui/material'
//import { makeStyles } from "@material-ui/core/styles"

import DashboardSidebarNavigation from "./dashboard-sidebar-navigation"
import clsx from "clsx"

const Dashboard = ({ children }) => {
  //const classes = useStyles()
  const mobileDevice = useMediaQuery("(max-width:650px)")

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <DashboardSidebarNavigation />{" "}
      <div className="">
        <div className="">
          <div
            className=""
          >
            {children}
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default Dashboard


