import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from "react-query";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
//import auth from '../auth/auth-helper';
import Grid from '@mui/material/Grid';
//import { makeStyles } from '@mui/styles';
//import {AuctionContext} from '../../DetailPage';

//import { useThisBid } from '../../../../data'
import { useAddBid } from '../../../../data'

import { loadAuction } from '../../../../data/api/api'

import { useParams } from 'react-router-dom';


import { loadBids } from '../../../../data/api/api';

const io = require('socket.io-client');
const socket = io();
 

const BidContext = React.createContext();

export default function Bidding( props) {
 // const classes = useStyles();
 // const { result } = useThisBid(id);
  
  const { id } = useParams();

  const { data: auction } = useQuery(["currentAuction", { id }], () =>
   loadAuction(id)
  );

  const { data = { results: [] }} = useQuery("bids", loadBids);
 
  const results = data.results;
  //console.log(results)


  const [amount, setAmount] = useState('');
  const [justEnded, setJustEnded] = useState(false)

  const [end_time, setEndTime] = useState(null);

  useEffect(() => {
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds = auction.duration * 24 * 60 * 60 * 1000; // Convert duration from days to milliseconds
      const endTimeInMilliseconds = new Date(auction.start_time).getTime() + durationInMilliseconds;
      const endTime = new Date(endTimeInMilliseconds);

      setEndTime(endTime);
    }
  }, [auction]);

  //console.log(end_time)

  const addBid = useAddBid();
  const [isAdding, setIsAdding] = useState(false);

  //const auction = useContext(AuctionContext);

  //const jwt = auth.isAuthenticated();

  useEffect(() => {
    socket.emit('join auction room', { room: auction?._uuid });
    return () => {
      socket.emit('leave auction room', {
        room: auction?._uuid,
      });
    };
  }, [auction]);
  

  useEffect(() => {
    socket.on('new bid', (payload) => {
      // Handle the new bid data
      props.updateAmounts(payload);
    });
    return () => {
      socket.off('new bid');
    };
  });
  

  const onSubmit = (evt) => {
    evt.preventDefault();
    addBid(Object.fromEntries(new FormData(evt.target)));
    evt.target.reset();
    setIsAdding(false);
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

const placeAmount = () => {
  let newAmount = {
    amount: amount,
    time: new Date(),
    //bidder: jwt.user,
  };
  socket.emit('new bid', {
    bidInfo: newAmount,
    room: auction?._uuid,
  });
  setAmount('');
};


  let AuctionBids = results.filter((bid)=> bid.auction === auction?.uuid);

  //console.log(AuctionBids)


  const minAmount = AuctionBids && AuctionBids.length > 0 ? AuctionBids[0].amount : auction?.starting_price;

  return (
    <div>
      {!justEnded && new Date() < new Date(end_time) && (
        <div className="">
          <TextField
            id="bid"
            label="Your Bid (Ksh)"
            value={amount}
            onChange={handleChange}
            type="number"
            margin="normal"
            helperText={`Enter Ksh${Number(minAmount) + 1} or more`}
            className=""
          />
          <br />
          <Button
            variant="contained"
            className=""
            color="secondary"
            disabled={amount < Number(minAmount) + 1}
            onClick={placeAmount}
          >
            Place Bid
          </Button>
          <br />
        </div>
      )}
        </div>
    )
}