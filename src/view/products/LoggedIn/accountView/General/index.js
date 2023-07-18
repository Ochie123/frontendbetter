import React from "react"

import { useSelector } from "react-redux"
import { Grid } from '@mui/material';

import ProfileDetails from "./ProfileDetails"
import GeneralSettings from "./GeneralSettings"



const General = ({ className, ...rest }) => {

  const { profile } = useSelector(state => state.profile)

  return (
    <Grid
      className=""
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <ProfileDetails user={profile} />
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <GeneralSettings user={profile}/>
      </Grid>
    </Grid>
  )
}


export default General
