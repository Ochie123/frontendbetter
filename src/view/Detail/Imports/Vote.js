import React, { useState, useContext, useEffect,useCallback } from 'react';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode"
import { useQuery } from "react-query";
import { AuctionContext } from '../DetailPage';
import { loadVotes } from '../../../data/api/api'

import { saveClaimsAction } from '../../../features/auth/authSlice';

const VoteComponent = () => {
  const [confidence_score, setConfidence_score] = useState(50);
  const [hasVoted, setHasVoted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const auction = useContext(AuctionContext);
  const ownerId = auction?.owner_id;
  const { data:votesData = { results: [] }} = useQuery("votes", loadVotes);
  const votes = votesData.results;

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const savedClaims = JSON.parse(localStorage.getItem('claims'));
  
  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token);
      dispatch(saveClaimsAction(claims));
      localStorage.setItem('claims', JSON.stringify(claims));
    }
  }, [token, savedClaims, dispatch]);

  const AuctionVotes = votes?.filter((vote)=> vote?.auction === auction?.uuid);

  //console.log(AuctionVotes)

  const checkUserVote = useCallback(() => {
    const userVotes = AuctionVotes.filter(vote => vote?.user === savedClaims?.user_id);
    setHasVoted(userVotes?.length > 0);

    //console.log(userVotes);
  }, [AuctionVotes, savedClaims?.user_id]);

  useEffect(() => {
    checkUserVote();
  }, [checkUserVote, AuctionVotes, savedClaims?.user_id]);

  const handleSliderChange = (value) => {
    setConfidence_score(value);
  };

  const handleVote = (evt) => {
    evt.preventDefault();

    if (hasVoted) {
      enqueueSnackbar("You have already voted for this auction.", {
        variant: 'warning',
      });
      return;
    }

    const formData = new FormData();
    formData.append('auction', auction?.uuid);
    formData.append('confidence_score', confidence_score);

    const token = localStorage.getItem('token');

    axios
      .post('http://cars-bids.online/api/votes/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        enqueueSnackbar(`You voted ${confidence_score}%`, {
          variant: 'success',
        });
        setHasVoted(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
<span>
  <Typography>
    <Typography textColor="primary.400" fontSize="xl3" fontWeight="xl" my={1}>
      Vote
    </Typography>
    {!hasVoted && ownerId !== savedClaims?.user_id && (
      <div>
        <Slider
          min={25}
          max={100}
          step={25}
          value={confidence_score}
          onChange={handleSliderChange}
        />
        <div>Selected: {confidence_score}%</div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          onClick={handleVote}
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Vote
        </Button>
      </div>
    )}
    {hasVoted && (
      <div>
        <Typography
          textColor="success.400"
          fontSize="xl"
          fontWeight="xl"
          my={1}
        >
          Already Voted
        </Typography>
      </div>
    )}
  </Typography>
</span>


  );
};

export default VoteComponent;
