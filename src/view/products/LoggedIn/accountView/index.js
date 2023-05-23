import React, { useState } from "react"
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,

} from "@mui/material"

import Header from "./Header"
import General from "./General"
import Subscription from "./Subscription"
import Notifications from "./Notifications"
import Security from "./Security"
import Page from '../../../../components/Page'

const AccountView = () => {
  //const classes = useStyles()
  const [currentTab, setCurrentTab] = useState("general")

  const handleTabsChange = (event, value) => {
    setCurrentTab(value)
  }

  return (
    <Page className="" title="Settings">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === "general" && <General />}
          {currentTab === "subscription" && <Subscription />}
          {currentTab === "notifications" && <Notifications />}
          {currentTab === "security" && <Security />}
        </Box>
      </Container>
    </Page>
  )
}



const tabs = [
  { value: "general", label: "General" },
  { value: "subscription", label: "Subscription" },
  { value: "notifications", label: "Notifications" },
  { value: "security", label: "Security" }
]

export default AccountView
