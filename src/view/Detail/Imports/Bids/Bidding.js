import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useSnackbar } from "notistack"
import { useParams } from 'react-router-dom';
import { loadAuction, loadBids } from '../../../../data/api/api';

const io = require('socket.io-client');
const socket = io();

export default function Bidding(props) {
  const { id } = useParams();
  const { data: auction } = useQuery(["currentAuction", { id }], () =>
    loadAuction(id)
  );

  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState("")

  const { data = { results: [] }} = useQuery("bids", loadBids);
  const results = data.results;

  const [amount, setAmount] = useState('');
  const [justEnded, setJustEnded] = useState(false);
  const [end_time, setEndTime] = useState(null);
  

  useEffect(() => {
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds = auction.duration * 24 * 60 * 60 * 1000; // Convert duration from days to milliseconds
      const endTimeInMilliseconds = new Date(auction.start_time).getTime() + durationInMilliseconds;
      const endTime = new Date(endTimeInMilliseconds);

      setEndTime(endTime);
    }
  }, [auction]);

  const [isAdding, setIsAdding] = useState(false); // Add isAdding state
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

  const handleChange = event => {
    setAmount(event.target.value)
}
const placeAmount = (evt) => {
  evt.preventDefault();

  const formData = new FormData();
  formData.append('auction', auction?.uuid);
  formData.append('amount', amount);
  
  const token = localStorage.getItem('token');

  axios
    .post('http://127.0.0.1:8000/api/bid/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      // Handle the response or update any necessary state
      enqueueSnackbar(`You Bid ${amount}`, {
        variant: 'success',
      });
      console.log(response.data);
  
      setAmount('');
      setIsAdding(false);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });

  let newBidInfo = {
    amount: amount,
    time: new Date(),
  };
  socket.emit('new bid', {
    bidInfo: newBidInfo,
    room: auction?._uuid,
  });
  setAmount('');
};

  

  let AuctionBids = results.filter((bid) => bid.auction === auction?.uuid);

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
  );
}
