import React, { memo, useEffect, useState } from "react"
import { styled } from "@mui/material/styles"
import PropTypes from "prop-types"
import axios from "axios"
import Sheet from "@mui/joy/Sheet"
import Container from "@mui/material/Container"
import List from "@mui/joy/List"
import Grid from "@mui/material/Grid"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import AspectRatio from "@mui/joy/AspectRatio"
import Typography from "@mui/joy/Typography"
import ListItem from "@mui/joy/ListItem"
import CollectionsIcon from "@mui/icons-material/Collections"
import InfoRounded from "@mui/icons-material/InfoRounded"
import jwt_decode from "jwt-decode"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
//import Sheet from '@mui/joy/Sheet';
//import List from '@mui/joy/List';
import ListDivider from "@mui/joy/ListDivider"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemButton from "@mui/joy/ListItemButton"

import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import FilterListIcon from "@mui/icons-material/FilterList"
import CheckboxFilterGroup from "../../../AuctionsList/plp/CheckboxFilterGroup"
import Timer from "../../../Homepage/Timer"
import FilterHeader from "../../../AuctionsList/plp/FilterHeader"
import FilterFooter from "../../../AuctionsList/plp/FilterFooter"
import SortButton from "../../../AuctionsList/plp/SortButton"

import { saveClaimsAction } from "../../../../features/auth/authSlice"
import {
  loadCategories,
  loadMakes,
  loadModels,
  loadAlls,
  loadImages,
  loadBids,
  loadVotes,
  loadAuction
} from "../../../../data/api/api"

import { SelectedFiltersProvider } from "../../../AuctionsList/plp/SelectedFiltersContext"

const PREFIX = "RSFFilter"

const defaultClasses = {
  root: `${PREFIX}-root`,
  facetGroups: `${PREFIX}-facetGroups`
}

const Root = styled("div")(({ theme }) => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${defaultClasses.root}`]: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },

  /**
   * Styles applied to the wrapper element around the facet groups.
   */
  [`& .${defaultClasses.facetGroups}`]: {
    overflow: "auto",
    overflowX: "hidden",
    flex: "1",
    position: "relative"
  }
}))

const MyBids = function({
  expandAll,
  hideClearLink,
  clearLinkText,
  submitOnChange,
  style,
  classes: c = {},
  title,
  onViewResultsClick,
  uuid
}) {
  const classes = { ...defaultClasses, ...c }
  const [selectedFilters, setSelectedFilters] = useState([])

  const handleSelectedFiltersChange = filters => {
    setSelectedFilters(filters)
  }
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen)
  }
  const { data: auction } = useQuery(["currentAuction", { uuid }], () =>
    loadAuction(uuid)
  )

  const { data} = useQuery( "", loadAlls)
  const auctions = data;

  //console.log(auctions)

  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const savedClaims = JSON.parse(localStorage.getItem("claims"))

  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token)
      dispatch(saveClaimsAction(claims))
      localStorage.setItem("claims", JSON.stringify(claims))
    }
  }, [token, savedClaims, dispatch])

  //console.log(allResults);

  const { data: imagesData = { results: [] } } = useQuery("images", loadImages)
  const images = imagesData.results

  const { data: bidsData = { results: [] } } = useQuery("bids", loadBids)
  const bids = bidsData.results

  const { data: votesData = { results: [] } } = useQuery("votes", loadVotes)
  const votes = votesData.results

  const filteredBids = bids?.filter(bid => bid?.bidder === savedClaims?.user_id)

  const allResults = filteredBids

  //console.log(allResults)

  const filterResults = () => {
    if (selectedFilters.length === 0) {
      return allResults
    }

    const filteredResults = allResults.filter(auction => {
      const { category, make, model, year, type } = auction

      // Check if all selected filters match the properties of the result
      return selectedFilters.every(filter => {
        const [filterType, filterValue] = filter.split(":")

        if (filterType === "category" && category == filterValue) {
          return true
        }

        if (filterType === "make" && make == filterValue) {
          return true
        }

        if (filterType === "model" && model == filterValue) {
          return true
        }

        if (filterType === "type" && type == filterValue) {
          return true
        }

        if (filterType === "year" && year == filterValue) {
          return true
        }

        return false
      })
    })

    return filteredResults
  }

  const [justEnded, setJustEnded] = useState(false)
  const [endTime, setEndTime] = useState(null)

  const update = () => {
    setJustEnded(true)
  }

  //const [end_time, setEndTime] = useState(null);

  useEffect(() => {
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds = auction.duration * 1000 // Convert duration from days to milliseconds
      const endTimeInMilliseconds =
        new Date(auction.start_time).getTime() + durationInMilliseconds
      const endTime = new Date(endTimeInMilliseconds)

      setEndTime(endTime)
    }
  }, [auction])

  const currentDate = new Date()

  const renderFilteredResults = () => {
    const filteredResults = filterResults()

    //console.log(filteredResults)

   // console.log(auctions)

    return (
      <>
        {Array.from(new Set(filteredResults.map(bid => bid.auction))).map(
          auctionUUID => {
            const userBid = auctions?.find(
              auction => auction.uuid === auctionUUID
            )
            if (userBid) {
              const filteredImages = images.filter(
                image => image.auction === userBid.uuid
              )
              const firstImage =
                filteredImages.length > 0 ? filteredImages[0] : null
              let AuctionBids = bids.filter(bid => bid.auction === userBid.uuid)

              const startTime = new Date(userBid?.start_time)
              const durationInMilliseconds =
                userBid?.duration * 1000 // Convert duration from days to milliseconds
              const endTime = new Date(
                startTime.getTime() + durationInMilliseconds
              )

              const getAuctionStatus = (startTime, endTime, currentTime) => {
                if (currentTime < startTime) {
                  return "Auction Not Started 🤗"
                } else if (currentTime >= startTime && currentTime <= endTime) {
                  return "Auction Live ☀️"
                } else if (currentTime > endTime) {
                  return "Auction Ended 🙈"
                } else {
                  return ""
                }
              }
              const auctionStatus = getAuctionStatus(
                startTime,
                endTime,
                currentDate
              )
              const filteredBids = bids?.filter(
                bid => bid?.bidder === savedClaims?.user_id
              )
              const filteredAuctions = filteredBids?.map(bid =>
                auctions?.find(auction => auction?.uuid === bid?.auction)
              )
              // console.log("Filtered Auctions:", filteredAuctions);

              const userBidsOnAuction = filteredBids?.filter(
                bid => bid.auction === userBid?.uuid
              )
              const userHighestBids = userBidsOnAuction.reduce(
                (maxBid, bid) => Math.max(maxBid, bid.amount),
                0
              )

              // const userBidsOnAuction = filteredBids?.filter(bid => bid.auction === userBid?.uuid);
              const highestBid = Math.max(
                ...AuctionBids.map(bid => parseFloat(bid.amount)),
                0
              )
              const isHighestBidder =
                userHighestBids <= highestBid &&
                Math.abs(highestBid) <= parseFloat(userBid.current_price)
              const isOutbid =
                highestBid > 0 &&
                userHighestBids < parseFloat(userBid.current_price)

              //console.log(auctionStatus)

              let AuctionVotes = votes.filter(
                vote => vote.auction === userBid?.uuid
              )

              //console.log(AuctionVotes)

              let totalVotes = AuctionVotes.length
              let sumVotes = AuctionVotes.reduce(
                (total, vote) => total + vote.confidence_score,
                0
              )
              let averageScore = totalVotes > 0 ? sumVotes / totalVotes : 0

              //console.log(`Confidence score of ${averageScore}%`);
              let formattedScore = averageScore.toFixed(2)
              //console.log(`Confidence score of ${formattedScore}%`);

              const filteredBidsLength = Array.from(new Set(filteredBids.map(bid => bid.auction))).length;

              return (
                <Link to={`/auctions/${userBid.uuid}`} key={userBid.uuid}>
                  <React.Fragment>
                    <ListItem>
                      <ListItemButton sx={{ gap: 2 }}>
                        <AspectRatio
                          sx={{
                            flexBasis: 220,
                            borderRadius: "md",
                            overflow: "auto"
                          }}
                        >
                          {firstImage && (
                            <li key={firstImage.id}>
                              <img
                                src={firstImage.image}
                                className="card-img-top"
                                alt={userBid.name}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "-20px",
                                  left: "0",
                                  padding: "0px"
                                }}
                              >
                                {currentDate > new Date(userBid?.start_time) ? (
                                  <>
                                    {endTime &&
                                    currentDate < new Date(endTime) ? (
                                      <Typography
                                        fontSize="md"
                                        borderRadius="sm"
                                        px={0.5}
                                        mr={0.5}
                                        sx={theme => ({
                                          ...theme.variants.soft.warning,
                                          color: "danger.400",
                                          verticalAlign: "text-top"
                                        })}
                                      >
                                        <Timer
                                          endTime={endTime}
                                          update={update}
                                        />
                                      </Typography>
                                    ) : (
                                      <div
                                        style={{
                                          bottom: "-20px",
                                          left: "0",
                                          padding: "17px"
                                        }}
                                      >
                                        <Typography
                                          fontSize="md"
                                          borderRadius="sm"
                                          px={0.5}
                                          mr={0.5}
                                          sx={theme => ({
                                            ...theme.variants.soft.danger,
                                            color: "danger.400",
                                            verticalAlign: "text-top"
                                          })}
                                        >
                                          Auction ended
                                        </Typography>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <Box
                                    sx={{
                                      whiteSpace: "nowrap",
                                      paddingLeft: 1
                                    }}
                                  >
                                    <Typography
                                      component="p"
                                      variant="h6"
                                    >{`Auction Starts at ${new Date(
                                      userBid?.start_time
                                    ).toLocaleString()}`}</Typography>
                                  </Box>
                                )}
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "-10px",
                                  right: "0",
                                  padding: "8px"
                                }}
                              >
                                {AuctionBids.length > 0 && (
                                  <Typography
                                    fontSize="md"
                                    borderRadius="sm"
                                    px={0.5}
                                    mr={0.5}
                                    sx={theme => ({
                                      ...theme.variants.soft.warning,
                                      color: "danger.400",
                                      verticalAlign: "text-top"
                                    })}
                                  >
                                    {highestBid}
                                  </Typography>
                                )}
                              </div>

                              <div
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  left: "0",
                                  padding: "8px"
                                }}
                              >
                                <Typography
                                  fontSize="md"
                                  borderRadius="sm"
                                  px={0.5}
                                  mr={0.5}
                                  sx={theme => ({
                                    ...theme.variants.soft.success,
                                    color: "danger.400",
                                    verticalAlign: "text-top"
                                  })}
                                >
                                  <CollectionsIcon /> {filteredImages.length}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  top: "0px",
                                  right: "0",
                                  padding: "8px"
                                }}
                              >
                                <Typography
                                  fontSize="md"
                                  borderRadius="sm"
                                  px={0.5}
                                  mr={0.5}
                                  sx={theme => ({
                                    ...theme.variants.soft.success,
                                    color: "danger.400",
                                    verticalAlign: "text-top"
                                  })}
                                >
                                  <InfoRounded
                                    sx={{
                                      fontSize: 16,
                                      my: 0.5,
                                      mr: 0.1,
                                      mt: "1px"
                                    }}
                                  />{" "}
                                  {formattedScore}%
                                </Typography>
                              </div>
                            </li>
                          )}
                        </AspectRatio>
                        <ListItemContent>
                          <Typography fontWeight="xl">
                            {userBid?.year} {userBid?.make} {userBid?.model}
                          </Typography>
                          <Typography level="body2">
                            {userHighestBids >= highestBid ? (
                              <Typography
                                fontSize="md"
                                borderRadius="sm"
                                sx={theme => ({
                                  color: "success.400",
                                  verticalAlign: "text-top"
                                })}
                              >
                                Congratulations
                                <br />
                                you're the
                                <br />
                                highest bidder!
                              </Typography>
                            ) : (
                              <Typography
                                fontSize="md"
                                borderRadius="sm"
                                sx={theme => ({
                                  color: "danger.400",
                                  verticalAlign: "text-top"
                                })}
                              >
                                You've been outbid.
                                <br />
                                your bid: {userHighestBids}
                              </Typography>
                            )}
                          </Typography>
                        </ListItemContent>
                      </ListItemButton>
                    </ListItem>
                    {auction !==
                      filteredResults[filteredResults.length - 1] && (
                      <ListDivider />
                    )}
                  </React.Fragment>
                </Link>
              )
            }
            return null
          }
        )}
      </>
    )
  }

  useEffect(() => {
    // Fetch auction choices and other data
    // ...

    // Example of how to use filterResults function
    const filteredResults = filterResults()
    //console.log(filteredResults);
  }, [selectedFilters])

  const { data: categoriesData = { results: [] } } = useQuery(
    "categories",
    loadCategories
  )
  const categories = categoriesData.results

  const { data: makesData = { results: [] } } = useQuery("makes", loadMakes)
  const makes = makesData.results

  const { data: modelsData = { results: [] } } = useQuery("models", loadModels)
  const models = modelsData.results

  const [auctionChoices, setAuctionChoices] = useState(null)

  useEffect(() => {
    const fetchAuctionChoices = async () => {
      try {
        const response = await axios.get(
          "https://cars-bids.online/trader/api/auction-choices/"
        )
        setAuctionChoices(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAuctionChoices()
  }, [])

  const facets = [
    {
      id: 1,
      name: "Category",
      options: categories.map(category => ({
        name: category.name,
        code: `category:${category.id}`,
        matches: 20
      }))
    },
    {
      id: 3,
      name: "Make",
      options: makes.map(make => ({
        name: make.name,
        code: `make:${make.name}`,
        matches: 20
      }))
    },
    {
      id: 4,
      name: "Model",
      options: models.map(model => ({
        name: model.name,
        code: `model:${model.name}`,
        matches: 20
      }))
    },
    {
      id: 5,
      name: "Year",
      options:
        auctionChoices?.supported_years.map(([value, label]) => ({
          name: label,
          code: `year:${value}`, // Use "year" instead of "value"
          matches: 20
        })) || []
    },
    {
      id: 6,
      name: "Type",
      options:
        auctionChoices?.supported_types.map(([value, label]) => ({
          name: label,
          code: `type:${value}`, // Use "type" instead of "value"
          matches: 20
        })) || []
    }

    // Add more facet groups as needed
  ]

  const handleCheckboxChange = (e, option) => {
    const isChecked = e.target.checked
    const filterCode = option.code

    if (isChecked) {
      setSelectedFilters(prevFilters => [...prevFilters, filterCode])
    } else {
      setSelectedFilters(prevFilters =>
        prevFilters.filter(filter => filter !== filterCode)
      )
    }
  }

  const filteredBidsLength = Array.from(new Set(filteredBids.map(bid => bid.auction))).length;
 // console.log(filteredBidsLength)


  return (
    <SelectedFiltersProvider
      value={{
        selectedFilters,
        setSelectedFilters: handleSelectedFiltersChange
      }}
    >
      <Container maxWidth="lg">
        <div className="d-flex border-bottom pb-2">
          <h4 className="mb-2">My Bids ({filteredBidsLength})</h4>
          <div className="d-flex ms-auto align-items-center">
            <SortButton />
          </div>
        </div>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Root style={style} className={classes.root}>
                <div className={classes.facetGroups}>
                  {facets &&
                    facets.map((group, i) => (
                      <CheckboxFilterGroup
                        group={group}
                        key={i}
                        defaultExpanded={expandAll}
                        submitOnChange={submitOnChange}
                        onSelectedFiltersChange={handleSelectedFiltersChange}
                      />
                    ))}
                </div>
                <FilterHeader
                  hideClearLink={hideClearLink}
                  clearLinkText={clearLinkText}
                  title={title}
                  submitOnChange={submitOnChange}
                />
                <FilterFooter
                  onViewResultsClick={onViewResultsClick}
                  submitOnChange={submitOnChange}
                />
              </Root>
            </Grid>

            <Grid item xs={8}>
              <Sheet
                variant=""
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  width: "auto",
                  borderRadius: "sm"
                }}
              >
                <List sx={{ py: "var(--ListDivider-gap)" }}>
                  {renderFilteredResults()}
                </List>
              </Sheet>
            </Grid>
          </Grid>
        </Box>

        {/* Mobile Layout */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="filter"
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              bottom: "30px",
              left: "15px",
              zIndex: 100,
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)"
            }}
          >
            <FilterListIcon sx={{ fontSize: "28px" }} />
          </IconButton>

          <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer}>
            <Root style={style} className={classes.root}>
              <div className={classes.facetGroups}>
                {facets &&
                  facets.map((group, i) => (
                    <CheckboxFilterGroup
                      group={group}
                      key={i}
                      defaultExpanded={expandAll}
                      submitOnChange={submitOnChange}
                      onSelectedFiltersChange={handleSelectedFiltersChange}
                    />
                  ))}
              </div>
              <FilterHeader
                hideClearLink={hideClearLink}
                clearLinkText={clearLinkText}
                title={title}
                submitOnChange={submitOnChange}
              />
              <FilterFooter
                onViewResultsClick={onViewResultsClick}
                submitOnChange={submitOnChange}
              />
            </Root>
          </Drawer>

          <List sx={{ py: "var(--ListDivider-gap)" }}>
            {renderFilteredResults()}
          </List>
        </Box>
      </Container>
    </SelectedFiltersProvider>
  )
}

MyBids.propTypes = {
  classes: PropTypes.object,
  onViewResultsClick: PropTypes.func,
  title: PropTypes.string,
  expandAll: PropTypes.bool,
  submitOnChange: PropTypes.bool,
  hideClearLink: PropTypes.bool,
  clearLinkText: PropTypes.string,
  style: PropTypes.object
}

MyBids.defaultProps = {
  onViewResultsClick: Function.prototype,
  submitOnChange: false
}

export default memo(MyBids)