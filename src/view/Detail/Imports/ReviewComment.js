//import ReviewRating from './ReviewRating';
import React, { useContext } from 'react';

import Badge from '@mui/joy/Badge';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
//import { RootState } from '../../../../src/store/reducers';
import Avatar from '@mui/material/Avatar';
import { loadBids } from '../../../data/api/api'
import ElapsedTime from './ElapsedTime';
import {AuctionContext} from '../DetailPage';

export default function ReviewComment({  result}) {
  //const { claims } = useSelector(state => state.auth)
  //const { profile } = useSelector(state => state.profile)
  const auction = useContext(AuctionContext);
  const { data = { results: [] }} = useQuery("bids", loadBids);

  const results = data.results;

  //console.log(results)

  let AuctionBids = results.filter((bid)=> bid.auction === auction?.uuid);
  //console.log(AuctionBids)



  const date = new Date(result?.timestamp);
  const ownerId = result?.author;
  const bidderIds = AuctionBids.map((bid) => bid.bidder);


  //console.log(ownerId)
  
  const renderOwnerTag = () => {
    if (ownerId === auction.owner_id) {
      return <Badge badgeContent="Owner" color="danger" size="sm" variant="solid" />;
    } else if (bidderIds.includes(ownerId)) {
      return <Badge badgeContent="Bidder" color="primary" size="sm" variant="solid" />;
    }
    return null;
  };

  
  return (
    <>
      <div className="d-flex">
      <Link to={``} className="avatar avatar-xl rounded-circle min-width-50 min-height-50">
        <Avatar
                 variant={"circle"}
                 alt="User"
                 className=""
                 src=""
               /> {renderOwnerTag()}
        </Link>
        <div className="ps-4">
          <h6 className="mb-0">{result?.username}</h6>  
          {AuctionBids.bidder}   
          
          

          <p className="text-sm mb-2"><ElapsedTime date={date} /> ago </p>
         
          <p className="text-sm mt-4">{result?.message}</p>
        </div>
      </div>
      <hr className="dark horizontal" />
    </>
  );
};