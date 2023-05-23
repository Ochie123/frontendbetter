import React from 'react';
import Typography from '@mui/joy/Typography';

import { useQuery } from "react-query";
//import styled from "styled-components";
import { loadAuction } from '../../data/api/api'
import { loadComments } from '../../data/api/api'

import { loadUsers } from '../../data/api/api';
import { useParams } from 'react-router-dom';
//import useCurrent from '../../data/useCurrent'
import './scss/astro-ecommerce.scss'
import "./style.css";

import ProductOverviewGrid from './Imports/ProductOverviewGrid'
import CommentSummaryChart from './Imports/CommentSummaryChart';
import { loadCars_Specifications } from '../../data/api/api';
//import data from './data.json'

const AuctionContext = React.createContext();

function DetailPage() {
  const { id } = useParams();

  const { data: auction } = useQuery(["currentAuction", { id }], () =>
    loadAuction(id)
  );

  const { data:commentsData = { results: [] }} = useQuery("comments", loadComments);
  const comments = commentsData.results;

  const { data: usersData = { results: [] } } = useQuery('users', loadUsers);
  const users = usersData.results;

  //console.log(users)
  const { data: cars_SpecificationsData = { results: [] } } = useQuery('cars_specifications', loadCars_Specifications);
  const carSpecifications = cars_SpecificationsData.results;

  console.log(auction)  
  
  //const filteredFeatures = carSpecifications.filter(car_specification => auction.car_specifications.includes(car_specification.id));
  //console.log(filteredFeatures)  


  //let AuctionBids = results.filter((bid)=> bid.auction === auction?.uuid);

  let productComments = comments.filter((comment) => comment.auction === auction?.uuid);

  //console.log(productComments)

  return (
    <AuctionContext.Provider value={auction}>
    <div className="container mt-5">
    <Typography textColor="primary.400" fontSize="xl3" fontWeight="xl" my={1}>
    {auction?.release_year} {auction?.name} {auction?.model}
     </Typography>
      <ProductOverviewGrid  
        title={auction?.model}
        overview={auction?.overview}
        reserveprice={auction?.current_price}
        type={auction?.type}
        details={auction?.overview}
      /> 
      <div className="my-5">
        <CommentSummaryChart results = {productComments}/>       
      </div>
      <hr className="dark horizontal my-5" />
    </div>
  </AuctionContext.Provider>

 
  )
}
export { AuctionContext, DetailPage };