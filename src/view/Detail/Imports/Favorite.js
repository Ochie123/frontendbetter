import React, { useState, useContext, useEffect,useCallback } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode"
import { useQuery } from "react-query";
import { AuctionContext } from '../DetailPage';
import { loadWatchlists } from '../../../data/api/api'
import { saveClaimsAction } from '../../../features/auth/authSlice';


const Favorite = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const auction = useContext(AuctionContext);
  const ownerId = auction?.owner_id;
  const { data:watchlistsData = { results: [] }} = useQuery("watchlists", loadWatchlists);
  const watchlists = watchlistsData.results;

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

  const AuctionWatchlists = watchlists?.filter((watchlist)=> watchlist?.auction === auction?.uuid);

  //console.log(AuctionWatchlists)

  const checkUserWatchlist = useCallback(() => {
    const userWatchlists = AuctionWatchlists.filter(watchlist => watchlist?.user === savedClaims?.user_id);
    setIsFavorite(userWatchlists?.length > 0);

    //console.log(userWatchlists);
  }, [AuctionWatchlists, savedClaims?.user_id]);

  useEffect(() => {
    checkUserWatchlist();
  }, [checkUserWatchlist, AuctionWatchlists, savedClaims?.user_id]);
  

  const handleFavoriteClick = (evt) => {
    evt.preventDefault();
    if (isFavorite) {
        enqueueSnackbar("You have already favorited this auction.", {
          variant: 'warning',
        });
        return;
      }
  
      const formData = new FormData();
      formData.append('auction', auction?.uuid);
    
  
      const token = localStorage.getItem('token');
  
      axios
        .post('https://cars-bids.online/api/watchlist/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          enqueueSnackbar(`You favorited ❤️`, {
            variant: 'success',
          });
          setIsFavorite(true);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <span>
      <FavoriteIcon
        color={isFavorite ? 'secondary' : 'inherit'}
        onClick={handleFavoriteClick}
      />
    </span>
  );
};

export default Favorite;
