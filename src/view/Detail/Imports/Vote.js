import React, { useState, useContext, useEffect,useCallback } from 'react';
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

  console.log(AuctionVotes)

  const checkUserVote = useCallback(() => {
    const userVotes = AuctionVotes.filter(vote => vote?.user === savedClaims?.user_id);
    setHasVoted(userVotes?.length > 0);

    console.log(userVotes);
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
      .post('http://192.168.43.38:8000/api/votes/', formData, {
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
    <div>
      <h2>Vote</h2>
      {hasVoted ? (
        'Already Voted'
      ) : null}
      {!hasVoted && ownerId !== savedClaims?.user_id && (
        <>
          <Slider
            min={25}
            max={100}
            step={25}
            value={confidence_score}
            onChange={handleSliderChange}
          />
          <div>Selected Percentage: {confidence_score}%</div>
          <button onClick={handleVote}>Vote</button>
        </>
      )}
    </div>
  );
};

export default VoteComponent;
