import React from 'react';
import styled from "styled-components";
import { useQuery } from "react-query";
//import { loadProduct } from '../../data/api/api'
//import { useParams } from 'react-router-dom';
//import useCurrent from '../../data/useCurrent'
//import './scss/astro-ecommerce.scss'


import ReviewComment from './Imports/ReviewComment';
import ProductOverviewGrid from './Imports/ProductOverviewGrid'
import CommentSummaryChart from './Imports/CommentSummaryChart';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  margin: 2em auto;
  max-width: 80em;
  position: relative;
`;


function DetailPage(props) {
  const { id } = useParams();
  const seeAllProducts = useCurrent((state) => state.seeAllProducts);

  const { data: product } = useQuery(["currentProduct", { id }], () =>
    loadProduct(id)
  );

 
  return (
    <div class="container mt-5">
      <ProductOverviewGrid  
        //colors={data.products[0].colors}
        
        title={product?.name}
        overview={product?.overview}
        reserveprice={product?.reserveprice}
        type={product?.type}
        details={product?.overview}
      
        //reviews={data.products[0].reviews}
       // sizes={data.products[0].sizes}
      />    


      <div class="my-5">
      <CommentSummaryChart reviews = {ReviewComment}/>       
      </div>


      <hr class="dark horizontal my-5" />
    
    </div>

    
  )
}
export default DetailPage;