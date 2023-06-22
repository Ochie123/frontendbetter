import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import CollectionsIcon from '@mui/icons-material/Collections';
import InfoRounded from "@mui/icons-material/InfoRounded"

import { useQuery } from "react-query";
import { loadImages, loadVotes } from '../../data/api/api';
import Favorite from '../Detail/Imports/Favorite';
import Timer from './Timer';
//import { useAllProducts } from '../../data';
import { useThisAuction } from '../../data';
import { Link } from "react-router-dom";
import { loadBids } from '../../data/api/api';

function Ending({ uuid }) {
  //const results = useAllProducts();
  const { data = { results: [] } } = useQuery("images", loadImages);
  const { auction } = useThisAuction(uuid);

  const results = data.results;

  const { data: bidsData = { results: [] } } = useQuery("bids", loadBids);
  const bids = bidsData.results;

  const { data: votesData = { results: [] } } = useQuery("votes", loadVotes)
  const votes = votesData.results

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
  }, [auction, auction?.uuid]);
  //console.log(end_time)

  const currentDate = new Date();

  let AuctionBids = bids.filter((bid) => bid.auction === auction?.uuid);

  //console.log(results)

  // Assuming you have the API response stored in a variable called 'images'
  const filteredImages = results.filter((image) => image.auction === auction.uuid);

  //console.log(filteredImages)
  let AuctionVotes = votes.filter(vote => vote.auction === auction?.uuid)

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

  return (
    <>
        <Card
          orientation="vertical"
          key={auction.name}
          variant="elevation"
          sx={{
            gap: 2,
            '--Card-padding': (theme) => theme.spacing(1),
          }}
        >
          <Link to={`/auctions/${auction.uuid}`}>
          <AspectRatio
            ratio="1.5"
            variant="soft"
            sx={{
              flexGrow: 1,
              minWidth: 250,
            }}
          >
            {filteredImages.length > 0 && (
              <li key={filteredImages[0].id}>
                <img
                  src={filteredImages[0].image}
                  className='card-img-top'
                  alt={auction.name}
                />
                <div style={{ position: 'absolute', bottom: '-20px', left: '0', padding: '8px' }}>
                  {currentDate > new Date(auction?.start_time) ? (
                    <>
                      {end_time && currentDate < new Date(end_time) ? (
                        <Typography
                          fontSize="md"
                          borderRadius="sm"
                          px={0.5}
                          mr={0.5}
                          sx={(theme) => ({
                            ...theme.variants.soft.warning,
                            color: 'danger.400',
                            verticalAlign: 'text-top',
                          })}
                        >
                          <Timer endTime={end_time} update={update} />
                        </Typography>
                      ) : (
                        <div style={{ bottom: '-20px', left: '0', padding: '15px' }}>
                          <Typography
                            fontSize="md"
                            borderRadius="sm"
                            px={0.5}
                            mr={0.5}
                            sx={(theme) => ({
                              ...theme.variants.soft.danger,
                              color: 'danger.400',
                              verticalAlign: 'text-top',
                            })}
                          >
                            Auction ended
                          </Typography>
                        </div>
                      )}
                    </>
                  ) : (
                     <div style={{ bottom: '-20px', left: '0', padding: '15px' }}>
                                              <Typography
                            fontSize="md"
                            borderRadius="sm"
                            px={0.5}
                            mr={0.5}
                            sx={(theme) => ({
                              ...theme.variants.soft.warning,
                              color: 'success.400',
                              verticalAlign: 'text-top',
                            })}
                          >

                            {`Auction Starts at ${new Date(auction?.start_time).toLocaleString()}`}
                          </Typography>

                    </div>
                  )}
                </div>
                <div style={{ position: 'absolute', bottom: '-10px', right: '0', padding: '8px' }}>
                  {AuctionBids.length > 0 &&
                    <Typography>
                      <Button
                        variant="solid"
                        size="sm"
                        color="primary"
                        sx={{ my: 0.5, ml: 60 }}
                      >
                        {Math.floor(AuctionBids[0].amount)}
                      </Button>
                    </Typography>
                  }
                </div>
                <div style={{ position: 'absolute', top: '0px', left: '0', padding: '8px' }}>
                  <Typography
                    fontSize="md"
                    borderRadius="sm"
                    px={0.5}
                    mr={0.5}
                    sx={(theme) => ({
                      ...theme.variants.soft.neutral,
                      color: 'danger.400',
                      verticalAlign: 'text-top',
                    })}
                  >
                    <CollectionsIcon /> {filteredImages.length}
                  </Typography>
                </div>
              </li>
            )}
          </AspectRatio>
          </Link>
          <Box sx={{ whiteSpace: 'nowrap', paddingLeft: 1 }}>
            <Typography fontWeight="xl">{auction?.year} {auction?.make} {auction?.model} 
            <span style={{ marginLeft: '30px' }}>
                       <InfoRounded
                         sx={{ fontSize: 16, my: 0.5, mr: 0.1, mt: "1px" }}
                        />{" "}
                            local
                        </span>
            <div style={{ bottom: '-20px', left: '0', padding: '15px' }}>
                          <Typography
                            fontSize="md"
                            borderRadius="sm"
                            px={0.5}
                            mr={0.5}
                            sx={(theme) => ({
                            
                              color: 'success.400',
                              verticalAlign: 'text-top',
                            })}
                          >
                       <span style={{ marginLeft: '30px' }}>
                       <InfoRounded
                         sx={{ fontSize: 16, my: 0.5, mr: 0.1, mt: "1px" }}
                        />{" "}
                            {formattedScore}%
                        </span>
                          </Typography>
                        </div>
            </Typography>
          </Box>
        </Card>
    
    </>
  )
}

export default Ending;
