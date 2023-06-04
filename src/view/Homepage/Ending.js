import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useQuery } from "react-query";
import { loadImages } from '../../data/api/api';
//import { useAllProducts } from '../../data';
import {useThisAuction}  from '../../data';
import { Link} from "react-router-dom";

function Ending({ uuid }) {
    //const results = useAllProducts();
    const { data = { results: [] }} = useQuery("images", loadImages);
    const { auction } = useThisAuction(uuid);

    const results = data.results;




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
                 </li>
              )}
              </AspectRatio>
              <Box sx={{ whiteSpace: 'nowrap', paddingLeft:1 }}>
                <Typography fontWeight="xl">{auction?.year} {auction?.name} </Typography>
                <Typography level="body2">{auction?.overview}</Typography>
              </Box>
            </Card>
            </Link>
        </>
      )
}
export default Ending;