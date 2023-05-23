import React, { useState,useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/joy/Box';
//import { makeStyles } from '@mui/styles';
//import { read } from './api-auction.js';
import { Link } from 'react-router-dom';
//import auth from '../auth/auth-helper';
//import {AuctionContext} from '../DetailPage';
import { useQuery } from "react-query";
//import styled from "styled-components";
import { loadAuction } from '../../../data/api/api'
import { loadBids } from '../../../data/api/api'
import { useParams } from 'react-router-dom';

import Timer from './Timer';
import Bidding from '../Imports/Bids/Bidding';


export default function Auction({ match }) {
  //const classes = useStyles();
  //const auction = useContext(AuctionContext);
  //const [auction, setAuction] = useState({});


  const { id } = useParams();

  const { data: auction } = useQuery(["currentAuction", { id }], () =>
    loadAuction(id)
  );

  const { data = { results: [] }} = useQuery("bids", loadBids);
  
 
  const results = data.results;

  const [error, setError] = useState('');
  const [justEnded, setJustEnded] = useState(false);

  const updateBids = (updatedAuction) => {
   // setAuction(updatedAuction);
  };

  const update = () => {
    setJustEnded(true);
  };

  const [end_time, setEndTime] = useState(null);

  useEffect(() => {
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds = auction.duration * 24 * 60 * 60 * 1000; // Convert duration from days to milliseconds
      const endTimeInMilliseconds = new Date(auction.start_time).getTime() + durationInMilliseconds;
      const endTime = new Date(endTimeInMilliseconds);

      setEndTime(endTime);
    }
  }, [auction]);


  useEffect(() => {
    // Update the end_time when a new auction is added
    setEndTime(null); // Reset end_time to null initially
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds =
        auction.duration * 24 * 60 * 60 * 1000; // Convert duration from days to milliseconds
      const endTimeInMilliseconds =
        new Date(auction.start_time).getTime() + durationInMilliseconds;
      const endTime = new Date(endTimeInMilliseconds);
  
      setEndTime(endTime);
    }
  }, [auction?.uuid]);
  //console.log(end_time)


  const currentDate = new Date();

  let AuctionBids = results.filter((bid)=> bid.auction === auction?.uuid);

  //console.log(AuctionBids)

  //const recentAmount = AuctionBids.length > 0 ? AuctionBids[0].amount : "-";

  return (
    <div className="">
      <Card className="">
        
        <CardHeader
          title={
            <span>
           {auction?.release_year} {auction?.name} {auction?.model}
            </span>
        }
          subheader={
            <span>
            <Typography textColor="primary.400" fontWeight="xl" my={1}>
            {currentDate < new Date(auction?.start_time) && 'Auction Not Started 🤗'}
            </Typography>
              

              <Typography textColor="success.400"fontWeight="xl" my={1}>
              {currentDate > new Date(auction?.start_time) &&currentDate < new Date(end_time) && 'Auction Live ☀️'}
             </Typography>


             <Typography textColor="danger.400"fontWeight="xl" my={1}>
             {currentDate > new Date(end_time) && 'Auction Ended 🙈'}
             </Typography>
            </span>
          }
        />

                  <Grid item xs={5} sm={5}>
                    <CardMedia
                        className=""
                       
                        title= {auction?.release_year}
                    />
                  </Grid>
                  
                  <Grid item xs={7} sm={7}>
                    {currentDate > new Date(auction?.start_time) 
                    ? (<>
                       
                    {end_time && currentDate < new Date(end_time) ? (
                      <Timer endTime={end_time} update={update} />
                       ) : (
                       <Typography component="p" variant="h6">
                         Auction ended
                       </Typography>
                    )}  
                    <div className="d-flex">
                    <Box sx={{ whiteSpace: 'nowrap', paddingLeft:1 }}>
                    <Typography
                         fontSize="xl"
                         borderRadius="sm"
                         px={0.5}
                         mr={0.5}
                         sx={(theme) => ({
                         ...theme.variants.soft.danger,
                         color: 'danger.400',
                         verticalAlign: 'text-top',
                         
                     })}
                     >
                      {AuctionBids.length} bids
                      </Typography>
                       </Box>
                      </div>
                        { AuctionBids.length > 0 &&  
                            <Typography component="p" variant="subtitle1" className="">
                                {` Last bid: Ksh ${AuctionBids[0].amount}`}
                            </Typography>
                        }
                        { <Bidding auction={auction} justEnded={justEnded} updateBids={updateBids}/> }
                      </>)
                    : 
                    <Box sx={{ whiteSpace: 'nowrap', paddingLeft:1 }}>
                    <Typography component="p" variant="h6">{`Auction Starts at ${new Date(auction?.start_time).toLocaleString()}`}</Typography>
                    </Box>
                    }
                   
                  </Grid>
           
           
                
              </Card>

        </div>)
}
