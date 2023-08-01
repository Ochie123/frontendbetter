import React, { useState, useEffect } from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/joy/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/joy/Box"
import InfoRounded from "@mui/icons-material/InfoRounded"
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TagIcon from '@mui/icons-material/Tag';
import jwt_decode from "jwt-decode"

import { useDispatch } from "react-redux"
//import { makeStyles } from '@mui/styles';

import { useQuery } from "react-query"
//import styled from "styled-components";
import { saveClaimsAction } from "../../../features/auth/authSlice"
import { loadAuction, loadBids, loadVotes,loadWatchlists } from "../../../data/api/api"

import { useParams } from "react-router-dom"

import Timer from "./Timer"
import Bidding from "../Imports/Bids/Bidding"
import Vote from "../Imports/Vote"

export default function Auction({ match }) {
  //const classes = useStyles();
  //const auction = useContext(AuctionContext);
  //const [auction, setAuction] = useState({});

  const { id } = useParams()

  const { data: auction } = useQuery(["currentAuction", { id }], () =>
    loadAuction(id)
  )

  const { data = { results: [] } } = useQuery("bids", loadBids)

  const results = data.results

  const { data: votesData = { results: [] } } = useQuery("votes", loadVotes)
  const votes = votesData.results


  const { data:watchlistsData = { results: [] }} = useQuery("watchlists", loadWatchlists);
  const watchlists = watchlistsData.results;

  const AuctionWatchlists = watchlists?.filter((watchlist)=> watchlist?.auction === auction?.uuid);


  const [justEnded, setJustEnded] = useState(false)

  const updateBids = updatedAuction => {
    // setAuction(updatedAuction);
  }

  const update = () => {
    setJustEnded(true)
  }

  const [end_time, setEndTime] = useState(null)

  useEffect(() => {
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds = auction.duration * 1000 // Convert duration from days to milliseconds
      const endTimeInMilliseconds =
        new Date(auction.start_time).getTime() + durationInMilliseconds
      const endTime = new Date(endTimeInMilliseconds)

      setEndTime(endTime)
    }
  }, [auction])

  useEffect(() => {
    // Update the end_time when a new auction is added
    setEndTime(null) // Reset end_time to null initially
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds = auction.duration * 1000 // Convert duration from days to milliseconds
      const endTimeInMilliseconds =
        new Date(auction.start_time).getTime() + durationInMilliseconds
      const endTime = new Date(endTimeInMilliseconds)

      setEndTime(endTime)
    }
  }, [auction, auction?.uuid])
  //console.log(end_time)

  const currentDate = new Date()

  let AuctionBids = results.filter(bid => bid.auction === auction?.uuid)

  let AuctionVotes = votes.filter(vote => vote.auction === auction?.uuid)

  const highestBid = Math.max(
    ...AuctionBids.map(bid => parseFloat(bid.amount)),
    0
  )

  //console.log(highestBid)

  //console.log(auction?.reserveprice)

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

  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  //console.log(token);
  const savedClaims = JSON.parse(localStorage.getItem("claims"))

  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token)
      dispatch(saveClaimsAction(claims))
      localStorage.setItem("claims", JSON.stringify(claims))
    }
  }, [token, savedClaims, dispatch])

  const ownerId = auction?.owner_id
  //console.log(ownerId);

  const renderVoteWarning = () => {
    if (ownerId === savedClaims?.user_id) {
      return (
        <p>
          You cannot vote <br />
          on your own auction.
        </p>
      )
    }
    return null
  }

  return (
    <div className="">
      <Card className="">
        <CardHeader
          title={
            <span>
              {auction?.year} {auction?.make} {auction?.model}
            </span>
          }
          subheader={
            <span>
              <Typography textColor="primary.400" fontWeight="xl" my={1}>
                {currentDate < new Date(auction?.start_time) &&
                  "Auction Not Started 🤗"}
              </Typography>

              <Typography textColor="success.400" fontWeight="xl" my={1}>
                {currentDate > new Date(auction?.start_time) &&
                  currentDate < new Date(end_time) &&
                  "Auction Live ☀️"}
              </Typography>

              <Typography textColor="danger.400" fontWeight="xl" my={1}>
                {currentDate > new Date(end_time) && "Auction Ended 🙈"}
              </Typography>
            </span>
          }
        />

        <Grid item xs={5} sm={5}>
          <CardMedia className="" title={auction?.year} />
        </Grid>

        <Grid item xs={7} sm={7}>
          {currentDate > new Date(auction?.start_time) ? (
            <>
              {end_time && currentDate < new Date(end_time) ? (
                <Timer endTime={end_time} update={update} />
              ) : (
                <Typography fontSize="h6" borderRadius="lg" px={2} mr={0.5}>
                  Auction ended
                </Typography>
              )}
              <div className="d-flex">
                <Box sx={{ whiteSpace: "nowrap", paddingLeft: 1 }}>
                  <Typography
                    fontSize="xl"
                    borderRadius="sm"
                    px={0.5}
                    mr={0.5}
                    sx={theme => ({
                      ...theme.variants.soft.danger,
                      color: "danger.400",
                      verticalAlign: "text-top"
                    })}
                  >
                    <TagIcon style={{ fontSize: 25 }}/>{AuctionBids.length} bids 
                    <span style={{ marginLeft: '30px' }}>
                      <FavoriteIcon style={{ fontSize: 25 }}/>{AuctionWatchlists.length}
                    </span>
                    <span style={{ marginLeft: '30px' }}>
                    <VisibilityIcon style={{ fontSize: 25 }}/>{AuctionWatchlists.length}
                  </span>
                  </Typography>
                </Box>
              </div>
              {AuctionBids.length > 0 && (
                <Typography
                  textColor="primary.400"
                  fontSize="h6"
                  borderRadius="lg"
                  px={2}
                  mr={0.5}
                >
                  {` Last bid: Ksh ${highestBid}`}
                </Typography>
              )}
              {
                <Bidding
                  auction={auction}
                  justEnded={justEnded}
                  updateBids={updateBids}
                />
              }
            </>
          ) : (
            <Box sx={{ whiteSpace: "nowrap", paddingLeft: 1 }}>
              <Typography
                component="p"
                variant="h6"
              >{`Auction Starts at ${new Date(
                auction?.start_time
              ).toLocaleString()}`}</Typography>
            </Box>
          )}
        </Grid>

        <Box
          sx={{
            ml: -1,
            mt: 0.75,
            px: 2,
            py: 0.5,
            borderRadius: 1,
            display: "flex",
            justifyContent: "space-between", // Add justify-content property
            typography: "caption",
            bgcolor: theme =>
              theme.palette.mode === "dark" ? "primary.900" : "primary.50",
            color: theme =>
              theme.palette.mode === "dark" ? "#fff" : "primary.700"
          }}
        >
          <div>
            <span>
              <Typography>
                <InfoRounded
                  sx={{ fontSize: 16, my: 0.5, mr: 0.1, mt: "1px" }}
                />{" "}
                Confidence score:{" "}
              </Typography>

              <Typography textColor="success.400" fontWeight="sm" my={1}>
                {formattedScore}%
              </Typography>

              <Typography textColor="danger.400" fontWeight="sm" my={1}>
                Based on {AuctionVotes.length} Votes
              </Typography>
            </span>
          </div>

          <Typography fontSize="sm" fontWeight="md" my={1}>
            <Vote disabled={ownerId === savedClaims?.user_id} />

            {renderVoteWarning()}
          </Typography>
        </Box>
      </Card>
    </div>
  )
}
