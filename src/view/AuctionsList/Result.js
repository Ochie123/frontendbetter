import {memo} from "react";

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
//import Sheet from '@mui/joy/Sheet';
//import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';

import { useQuery } from "react-query";
import { loadImages } from '../../data/api/api';

import { useAllAuctions } from '../../data';

import {useThisAuction}  from '../../data';

//<h3>///I have no  for ' (const result of slicedResults) { products.push(createProduct(result)); // Assuming createProduct function handles creating product objects from individual auction data}' function in my code hence I get 'createProduct' is not defined</h3>

import { Link} from "react-router-dom";


function Result({ uuid }) {
  const { auction } = useThisAuction(uuid);
  const results = useAllAuctions();

  const { data = { results: [] }} = useQuery("images", loadImages);
  const images = data.results;

  const filteredImages = images.filter((image) => image.auction === (auction?.uuid || ''));

  if (!auction) {
    // Handle the case where the auction is not available or undefined
    return null;
  }

  return (
    <Link to={`/auctions/${auction.uuid}`}>
      <React.Fragment key={auction.name}>
        <ListItem>
          <ListItemButton sx={{ gap: 2 }}>
            <AspectRatio sx={{ flexBasis: 250, borderRadius: 'md', overflow: 'auto' }}>
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
            <ListItemContent>
              <Typography fontWeight="xl">{auction?.year} {auction?.name} </Typography>
              <Typography level="body2">{auction?.name}</Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
        {auction !== results.length - 1 && <ListDivider />}
      </React.Fragment>
    </Link>
  );
}

export default memo(Result);
