import React, { useContext, Fragment,useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import Typography from '@mui/joy/Typography';
import {AuctionContext} from '../DetailPage';
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { loadUser } from '../../../data/api/api'
import { loadUsers } from '../../../data/api/api';
import ReviewComment from './ReviewComment';
import { loadAuctions } from '../../../data/api/api'
import AddCommentModal from './AddCommentModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function CommentSummaryChart({results, id}) {
 // const { id } = useParams();
  //const { ownerId } = useParams();
  const auction = useContext(AuctionContext);
  const username = auction?.username;

  const [scrollPosition, setScrollPosition] = useState(0);

  const { data:auctionsData = { results: [] }} = useQuery("auctions", loadAuctions);
  const auctions = auctionsData.results;

  const { data: usersData = { results: [] } } = useQuery('users', loadUsers);
  const users = usersData.results;

  //console.log(users)
  const { data: user } = useQuery(["currentUser", { id }], () =>
  loadUser(id)
);

  const ownerId = auction?.owner_id;

  useEffect(() => {
    if (scrollPosition !== 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

  const handleDialogClose = (evt) => {
    evt.preventDefault();
    setScrollPosition(window.pageYOffset);
  };
 // console.log(ownerId)

 

  return (
    <>
    <div className="row">
      <div className="col-12 col-lg-5">
        <div className="card shadow-xs mb-4">
          <div className="card-body p-md-5">
          <Typography textColor="success.400" fontSize="xl3" fontWeight="xl" my={1}>
         Comments
        </Typography>
          <div className="d-flex">
      
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
           {results?.length}  comments
          </Typography>      
    
          </div>
         
          <h6>Share your thoughts</h6>
          <p>If you like this item, share your thoughts with others.</p>
          <AddCommentModal onDialogClose={handleDialogClose} />
          </div>
        </div>
     
      </div>
      <div className="col-12 col-lg-7 max-height-500 overflow-scroll shadow-xs rounded-3 pt-4">
        <div className="card card-plain">
          <div className="card-body">
          {results?.map(result => (
   
          <ReviewComment result={result} />

          ))}

          </div>
        </div>
      </div>

      <br/>

     <div className="card shadow-xs mb-4">
     <br/>
        <div className="d-flex">
        <Link to={`/users/${ownerId}`} className="avatar avatar-xl rounded-circle min-width-50 min-height-50">
        <Avatar
                 variant={"circle"}
                 alt="User"
                 className=""
                 src="{profile.avatar}"
               />
     </Link>
        <div className="ps-4">
    
          <h6 className="mb-0">Seller</h6>
      <Typography textColor="primary.400" fontSize="md" fontWeight="xl" my={1}>
      {username}
     </Typography>
          <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        California
      </Typography>
        </div>
      </div>
      </div> 
    </div>

    </>
    
  );
};