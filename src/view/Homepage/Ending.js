import React, { useState,useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import { useQuery } from "react-query";
import { loadImages } from '../../data/api/api';
import Timer from './Timer';
//import { useAllProducts } from '../../data';
import {useThisAuction}  from '../../data';
import { Link} from "react-router-dom";
import { loadBids } from '../../data/api/api';

function Ending({ uuid }) {
    //const results = useAllProducts();
    const { data = { results: [] }} = useQuery("images", loadImages);
    const { auction } = useThisAuction(uuid);

    const results = data.results;

    const { data:bidsData = { results: [] }} = useQuery("bids", loadBids);
    const bids = bidsData.results;


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
    console.log(end_time)
  
  
    const currentDate = new Date();
  
    let AuctionBids = bids.filter((bid)=> bid.auction === auction?.uuid);



    //console.log(results)

    // Assuming you have the API response stored in a variable called 'images'
    const filteredImages = results.filter((image) => image.auction === auction.uuid);

    //console.log(filteredImages)




      return (
        <>
        <Link to={`/auctions/${auction.uuid}`}>
            <Card
              orientation="vertical"
              key={auction.name}
              variant="elevation"
              sx={{
                gap: 2,
                '--Card-padding': (theme) => theme.spacing(1),
              }}
            >
              <AspectRatio ratio="1.5"   variant="soft"
          sx={{
            flexGrow: 1,
            minWidth: 250,
   
          }}>
              {filteredImages.length > 0 && (
                <li key={filteredImages[0].id}>
                  <img
                    src={filteredImages[0].image}
                     className='card-img-top'
                     alt={auction.name}
                  />
                  <div style={{ position: 'absolute', bottom: '-20px', left: '0', padding: '8px' }}>

                  {currentDate > new Date(auction?.start_time) 
                    ? (<>
                       
                    {end_time && currentDate < new Date(end_time) ? (
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
                      <Timer endTime={end_time} update={update} />
                      </Typography>
                       ) : (
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
                         Auction ended
                       </Typography>
                    )}  
    
                    
                      </>)
                    : 
                    <Box sx={{ whiteSpace: 'nowrap', paddingLeft:1 }}>
                    <Typography component="p" variant="h6">{`Auction Starts at ${new Date(auction?.start_time).toLocaleString()}`}</Typography>
                    </Box>
                    }


                  </div>
                 </li>
              )}
              </AspectRatio>
              <Box sx={{ whiteSpace: 'nowrap', paddingLeft:1 }}>
                <Typography fontWeight="xl">{auction?.year} {auction?.make} {auction?.model}
                { AuctionBids.length > 0 &&  
                <Button
                  variant="outlined"
                  size="sm"
                  px={2}
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: 'auto', fontWeight: 500, marginLeft: '1rem'  }}
        >
                      
                            <Typography>
                              {AuctionBids[0].amount}
                            </Typography>
                       
                  
        </Button>
         }
                 </Typography>

              </Box>
            </Card>
            </Link>
        </>
      )
}
export default Ending;