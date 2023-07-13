import React, { useState, useEffect } from "react"
import clsx from "clsx"
import PerfectScrollbar from "react-perfect-scrollbar"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Table from '@mui/joy/Table';

import { useQuery } from "react-query";
//import styled from "styled-components";
import { loadBids, loadComments, loadUsers, loadUser } from '../../../../data/api/api'

import { Link} from "react-router-dom";
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
} from "react-feather"
import {
  Box,
  Card,
  IconButton,
  SvgIcon,

  TableBody,
  TableCell,
  TableHead,
  TableRow,
  createStyles,
 
} from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"

import {
  availabilityOptions,
  categoryOptions,
  sortOptions,
  statusOptions 
} from '../../../../others/helpers/InputAuctionOptions'
import {
  applyFilters,
  applyPagination,
  
} from './TableResultsHelpers'


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

const Results = ({ className, results,result, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = useState(statusOptions[0].value);

  const [endTime, setEndTime] = useState(null);

  const { data = { results: [] }} = useQuery("bids", loadBids);
  const bids = data.results;

  const { data:commentsData = { results: [] }} = useQuery("comments", loadComments);
  const comments = commentsData.results;

  const { data: usersData = { results: [] } } = useQuery("users", loadUsers)
  const users = usersData.results

  const [selectedResult, setSelectedResult] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDropdownChange = event => {
    const resultId = event.target.value
    setSelectedResult(resultId)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const {classes} = useStyles(createStyles)
  const [selectedResults, setSelectedResults] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(25)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState(sortOptions[0].value)
  const [bidAmountSortOrder, setBidAmountSortOrder] = useState("desc");


 
 
 
  const sortedResults = [...paginatedResults].sort((a, b) => {
    const aBids = bids.filter(bid => bid.auction === a.uuid);
    const bBids = bids.filter(bid => bid.auction === b.uuid);
  
    const aLastBidAmount = aBids.length > 0 ? aBids[aBids.length - 1].amount : 0;
    const bLastBidAmount = bBids.length > 0 ? bBids[bBids.length - 1].amount : 0;
  
    if (bidAmountSortOrder === "asc") {
      return aLastBidAmount - bLastBidAmount;
    } else {
      return bLastBidAmount - aLastBidAmount;
    }
    
  });
  

  return (
    <Card className={clsx("", className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1200}>
          <Table color="danger">
            <TableHead>
              <TableRow>
           
                <TableCell>Auction Name</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Auction Status </TableCell>
                <TableCell onClick={handleSortByBidAmount}>
                  Bid amount{" "}
                  {bidAmountSortOrder === "desc" ? (
                 <ArrowDownwardIcon />
                  ) : (
                  <ArrowUpwardIcon />
                  )}
                </TableCell>
                <TableCell>
                No. of bids
                </TableCell>
                <TableCell>
                No. of Comments
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {sortedResults
  .filter((result) => {
    if (statusFilter === 'notStarted') {
      return currentDate < new Date(result?.start_time);
    } else if (statusFilter === 'live') {
      return (
        currentDate >= new Date(result?.start_time) && currentDate <= endTime
      );
    } else if (statusFilter === 'ended') {
      return currentDate > endTime;
    } else {
      return true; // Show all results when no specific status is selected
    }
  })
  .map((result) => {
  const isResultSelected = selectedResults.includes(result.uuid);
  const resultBids = bids.filter(bid => bid.auction === result.uuid);
  const resultComments = comments.filter((comment) => comment.auction === result?.uuid);

  const highestBid = Math.max(
    ...resultBids.map(bid => parseFloat(bid.amount)),
    0
  )


  const startTime = new Date(result?.start_time);
  const durationInMilliseconds = result?.duration * 24 * 60 * 60 * 1000; // Convert duration from days to milliseconds
  const endTime = new Date(startTime.getTime() + durationInMilliseconds);
  
  // Get the auction status for the current result
  const auctionStatus = getAuctionStatus(startTime, endTime, currentDate);


  //<Typography textColor="success.400"fontWeight="xl" my={1}>
  //{currentDate > new Date(auction?.start_time) &&currentDate < new Date(end_time) && 'Auction Live ☀️'}
  //</Typography>

  return (
    <TableRow key={result.uuid}>
      <TableCell className="">
        {result.name}
      </TableCell>
      <TableCell>{new Date(result.start_time).toLocaleString()}</TableCell>
      <TableCell> {result.duration} day(s)</TableCell>
      <TableCell>
      {auctionStatus}
</TableCell>

      <TableCell>
      {highestBid}
        
      </TableCell>
      <TableCell>
      {resultBids.length} bids
      <Button
            variant="outlined"
                    onClick={handleDropdownChange}
                    value={result.uuid}
                  >
                    View bids
                  </Button>
      </TableCell>
      <TableCell>
      {resultComments.length} comments
      <Button
                    variant="outlined"
                    onClick={handleDropdownChange}
                    value={result.uuid}
                  >
                    View comments
                  </Button>
      </TableCell>
      <TableCell>
        <IconButton>
          <SvgIcon fontSize="small">
            <EditIcon />
          </SvgIcon>
        </IconButton>
        <IconButton>
          <Link to={`/auctions/${result.uuid}`}>
            <ArrowRightIcon />
          </Link>
        </IconButton>
      </TableCell>
    </TableRow>
  );
})}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}


export default Results;
