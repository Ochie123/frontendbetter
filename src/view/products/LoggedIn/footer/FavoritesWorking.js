import React, { useState, useContext, useEffect } from 'react';
import AspectRatio from "@mui/joy/AspectRatio"
import Typography from "@mui/joy/Typography"
import ListItem from "@mui/joy/ListItem"
import ListDivider from "@mui/joy/ListDivider"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemButton from "@mui/joy/ListItemButton"
import { Link } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { useQuery } from "react-query";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import {  loadAuctions, loadImages, loadAuction ,loadBids} from '../../../../data/api/api';
import { saveClaimsAction } from '../../../../features/auth/authSlice';

function Mybids() {

  const { id } = useParams()

  const { data: auction } = useQuery(["currentAuction", { id }], () =>
    loadAuction(id)
  )

  const { data: AuctionsData = { results: [] } } = useQuery("results", loadAuctions);
  const auctions = AuctionsData.results;
  const { data: bidsData = { results: [] } } = useQuery("bids", loadBids)
  const bids = bidsData.results
 
  const { data: imagesData = { results: [] } } = useQuery("images", loadImages)
  const images = imagesData.results

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

  //const userWatchlists = watchlists?.filter(watchlist => watchlist?.user === savedClaims?.user_id);
  const filteredBids = bids?.filter(bid => bid?.bidder === savedClaims?.user_id);


  //const filteredAuctions = userWatchlists?.map(watchlist => (auctions?.find(auction => auction?.uuid === watchlist?.auction)));
  

  //console.log(auctions);



  return (
    <>
      {Array.from(new Set(filteredBids.map(bid => bid.auction))).map(auctionUUID => {
        const userBid = auctions.find(auction => auction.uuid === auctionUUID);
        if (userBid) {
          const filteredImages = images.filter(image => image.auction === userBid.uuid);
          const firstImage = filteredImages.length > 0 ? filteredImages[0] : null;
  
          const filteredAuctions = filteredBids?.map(bid => auctions?.find(auction => auction?.uuid === bid?.auction));
         // console.log("Filtered Auctions:", filteredAuctions);

         let AuctionBids = bids.filter(bid => bid.auction === userBid.uuid)

          const userBidsOnAuction = filteredBids?.filter(bid => bid.auction === userBid?.uuid);
          const userHighestBids = userBidsOnAuction.reduce((maxBid, bid) => Math.max(maxBid, bid.amount), 0);
        
         // const userBidsOnAuction = filteredBids?.filter(bid => bid.auction === userBid?.uuid);
          const highestBid = Math.max(...AuctionBids.map(bid => parseFloat(bid.amount)), 0);
          const isHighestBidder = userHighestBids <= highestBid && Math.abs(highestBid) <= parseFloat(userBid.current_price);
          const isOutbid = highestBid > 0 && userHighestBids < parseFloat(userBid.current_price);
          
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
                        </li>
                      )}
                    </AspectRatio>
                    <ListItemContent>
                      <Typography fontWeight="xl">
                        {userBid?.year} {userBid?.make} {userBid?.model}
                      </Typography>
                      <Typography level="body2">
                        {highestBid > 0 && (
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
                            {Math.floor(highestBid)}
                          </Typography>
                        )}
                      <p>your bid {userHighestBids} </p> 
                      <p>highest bid {highestBid}</p> 

                       {userHighestBids >= highestBid ? (
                          <Typography fontWeight="xl">
                            {/* ...other code */}
                            Congratulations, you're,<br/>
                             the highest bidder!
                          </Typography>
                        ) : (
                          <Typography fontWeight="xl">
                            You've been outbid.
                          </Typography>
                        )}


                       
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                {userBid !== auctions[auctions.length - 1] && (
                  <ListDivider />
                )}
              </React.Fragment>
            </Link>
          );
        }
        return null;
      })}
    </>
  );
  
  
  
  
  
  
}

export default Mybids;
