import React, { useState, useEffect } from "react"
import clsx from "clsx"
import PerfectScrollbar from "react-perfect-scrollbar"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import Table from "@mui/joy/Table"

import { useQuery } from "react-query"
//import styled from "styled-components";
import { loadBids, loadComments, loadUsers } from "../../../../data/api/api"

import { Link } from "react-router-dom"
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from "react-feather"
import {
  Box,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  SvgIcon,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  createStyles
} from "@mui/material"

import Button from "@mui/material/Button"
import VisibilityIcon from "@mui/icons-material/Visibility"
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
} from "../../../../others/helpers/InputAuctionOptions"
import { applyFilters } from "./TableResultsHelpers"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
}

const Results = ({ className, results, result, ...rest }) => {
  const [open, setOpen] = React.useState(false)
  const [statusFilter, setStatusFilter] = useState(statusOptions[0].value)

  const [selectedResult, setSelectedResult] = useState(null)
  const [isBidsDialogOpen, setIsBidsDialogOpen] = useState(false)
  const [isCommentsDialogOpen, setIsCommentsDialogOpen] = useState(false)
  const [filteredBids, setFilteredBids] = useState([])
  const [filteredComments, setFilteredComments] = useState([])

  const [endTime, setEndTime] = useState(null)

  const { data = { results: [] } } = useQuery("bids", loadBids)
  const bids = data.results

  const { data: commentsData = { results: [] } } = useQuery(
    "comments",
    loadComments
  )
  const comments = commentsData.results

  const { data: usersData = { results: [] } } = useQuery("users", loadUsers)
  const users = usersData.results

  const { classes } = useStyles(createStyles)
  const [selectedResults, setSelectedResults] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(25)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState(sortOptions[0].value)
  const [bidAmountSortOrder, setBidAmountSortOrder] = useState("desc")

  const [sortOrder, setSortOrder] = useState("desc")
  const [filters, setFilters] = useState({
    category: null,
    availability: null,
    inStock: null,
    bestdeals: null
  })

  const handleSortByBidAmount = () => {
    const newSortOrder = bidAmountSortOrder === "asc" ? "desc" : "asc"
    setBidAmountSortOrder(newSortOrder)
  }

  const handleSortByBids = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newSortOrder)
  }

  const handleQueryChange = event => {
    event.persist()
    setQuery(event.target.value)
  }

  const handleCategoryChange = event => {
    event.persist()

    let value = null

    if (event.target.value !== "all") {
      value = event.target.value
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      category: value
    }))
  }
  const handleStatusChange = event => {
    setStatusFilter(event.target.value)
  }

  const handleAvailabilityChange = event => {
    event.persist()

    let value = null

    if (event.target.value !== "all") {
      value = event.target.value
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      availability: value
    }))
  }

  const handleStockChange = event => {
    event.persist()

    let value = null

    if (event.target.checked) {
      value = true
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      inStock: value
    }))
  }

  const handleBestdealsChange = event => {
    event.persist()

    let value = null

    if (event.target.checked) {
      value = true
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      bestdeals: value
    }))
  }

  const handleSortChange = event => {
    event.persist()
    setSort(event.target.value)
  }

  const handleSelectAllResults = event => {
    setSelectedResults(
      event.target.checked ? results.map(result => result.uuid) : []
    )
  }

  const handleSelectOneResult = (event, resultId) => {
    if (!selectedResults.includes(resultId)) {
      setSelectedResults(prevSelected => [...prevSelected, resultId])
    } else {
      setSelectedResults(prevSelected =>
        prevSelected.filter(uuid => uuid !== resultId)
      )
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = event => {
    setLimit(parseInt(event.target.value))
  }

  const applyPagination = (results, page, limit) => {
    const startIndex = page * limit
    const endIndex = startIndex + limit
    return results.slice(startIndex, endIndex)
  }
  // Usually query is done on backend with indexing solutions
  const filteredResults = applyFilters(results, query, filters)
  const paginatedResults = applyPagination(filteredResults, page, limit)
  const enableBulkOperations = selectedResults.length > 0
  const selectedSomeResults =
    selectedResults.length > 0 && selectedResults.length < results.length
  const selectedAllResults = selectedResults.length === results.length

  useEffect(() => {
    if (result && result.start_time && result.duration) {
      const durationInMilliseconds = result.duration * 1000 // Convert duration from days to milliseconds
      const endTimeInMilliseconds =
        new Date(result.start_time).getTime() + durationInMilliseconds
      const endTime = new Date(endTimeInMilliseconds)

      setEndTime(endTime)
    }
  }, [result])

  const currentDate = new Date()
  const getAuctionStatus = (startTime, endTime, currentTime) => {
    if (currentTime < startTime) {
      return "Auction Not Started 🤗"
    } else if (currentTime >= startTime && currentTime <= endTime) {
      return "Auction Live ☀️"
    } else if (currentTime > endTime) {
      return "Auction Ended 🙈"
    } else {
      return ""
    }
  }

  const sortedResults = [...paginatedResults].sort((a, b) => {
    const aBids = bids.filter(bid => bid.auction === a.uuid)
    const bBids = bids.filter(bid => bid.auction === b.uuid)

    const aLastBidAmount = aBids.length > 0 ? aBids[aBids.length - 1].amount : 0
    const bLastBidAmount = bBids.length > 0 ? bBids[bBids.length - 1].amount : 0

    if (bidAmountSortOrder === "asc") {
      return aLastBidAmount - bLastBidAmount
    } else {
      return bLastBidAmount - aLastBidAmount
    }
  })

  return (
    <Card className={clsx("", className)} {...rest}>
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <TextField
            className=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder="Search products"
            value={query}
            variant="outlined"
          />
          <Box flexGrow={1} />
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={3} display="flex" alignItems="center">
          <TextField
            className=""
            label="Category"
            name="category"
            onChange={handleCategoryChange}
            select
            SelectProps={{ native: true }}
            value={filters.category || "all"}
            variant="outlined"
          >
            {categoryOptions.map(categoryOption => (
              <option key={categoryOption.id} value={categoryOption.id}>
                {categoryOption.name}
              </option>
            ))}
          </TextField>
          <TextField
            className=""
            label="Availability"
            name="availability"
            onChange={handleAvailabilityChange}
            select
            SelectProps={{ native: true }}
            value={filters.availability || "all"}
            variant="outlined"
          >
            {availabilityOptions.map(avalabilityOption => (
              <option key={avalabilityOption.id} value={avalabilityOption.id}>
                {avalabilityOption.name}
              </option>
            ))}
          </TextField>

          <TextField
            className=""
            label="Auction Status"
            name="status"
            onChange={handleStatusChange}
            select
            SelectProps={{ native: true }}
            value={statusFilter}
            variant="outlined"
          >
            {statusOptions.map(statusOption => (
              <option key={statusOption.value} value={statusOption.value}>
                {statusOption.label}
              </option>
            ))}
          </TextField>

          <FormControlLabel
            className=""
            control={
              <Checkbox
                checked={!!filters.inStock}
                onChange={handleStockChange}
                name="inStock"
              />
            }
            label="In Stock"
          />
          <FormControlLabel
            className=""
            control={
              <Checkbox
                checked={!!filters.bestdeals}
                onChange={handleBestdealsChange}
                name="bestdeals"
              />
            }
            label="Bestdeals"
          />
        </Box>
      </Box>

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
                <TableCell>No. of bids</TableCell>
                <TableCell>No. of Comments</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedResults
                .filter(result => {
                  if (statusFilter === "notStarted") {
                    return currentDate < new Date(result?.start_time)
                  } else if (statusFilter === "live") {
                    return (
                      currentDate >= new Date(result?.start_time) &&
                      currentDate <= endTime
                    )
                  } else if (statusFilter === "ended") {
                    return currentDate > endTime
                  } else {
                    return true // Show all results when no specific status is selected
                  }
                })
                .map(result => {
                  const isResultSelected = selectedResults.includes(result.uuid)
                  const resultBids = bids.filter(
                    bid => bid.auction === result.uuid
                  )

                  const handleBidsDialogOpen = resultId => {
                    setSelectedResult(resultId)
                    const resultBids = bids.filter(
                      bid => bid.auction === resultId
                    )
                    setFilteredBids(resultBids)
                    setIsBidsDialogOpen(true)
                  }

                  const handleBidsDialogClose = () => {
                    setIsBidsDialogOpen(false)
                  }

                  const handleCommentsDialogClose = () => {
                    setIsCommentsDialogOpen(false)
                  }

                  const resultComments = comments.filter(
                    comment => comment.auction === result?.uuid
                  )

                  const handleCommentsDialogOpen = resultId => {
                    setSelectedResult(resultId)
                    const resultComments = comments.filter(
                      comment => comment.auction === resultId
                    )
                    setFilteredComments(resultComments)
                    setIsCommentsDialogOpen(true)
                  }

                  const highestBid = Math.max(
                    ...resultBids.map(bid => parseFloat(bid.amount)),
                    0
                  )

                  const startTime = new Date(result?.start_time)
                  const durationInMilliseconds =
                    result?.duration * 1000 // Convert duration from days to milliseconds
                  const endTime = new Date(
                    startTime.getTime() + durationInMilliseconds
                  )

                  // Get the auction status for the current result
                  const auctionStatus = getAuctionStatus(
                    startTime,
                    endTime,
                    currentDate
                  )

                  //<Typography textColor="success.400"fontWeight="xl" my={1}>
                  //{currentDate > new Date(auction?.start_time) &&currentDate < new Date(end_time) && 'Auction Live ☀️'}
                  //</Typography>

                  return (
                    <TableRow key={result.uuid}>
                      <TableCell className="">{result.name}</TableCell>
                      <TableCell>
                        {new Date(result.start_time).toLocaleString()}
                      </TableCell>
                      <TableCell> {result.duration/(24 * 60 * 60)} day(s)</TableCell>
                      <TableCell>{auctionStatus}</TableCell>

                      <TableCell>{highestBid}</TableCell>
                      <TableCell>
                        <VisibilityIcon
                          onClick={() => handleBidsDialogOpen(result.uuid)}
                        />
                        {resultBids.length} bids
                      </TableCell>

                      <Dialog
                        open={isBidsDialogOpen}
                        onClose={handleBidsDialogClose}
                      >
                        <DialogTitle>Bids Details</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            <Box minWidth={400}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Bidder</TableCell>
                                    <TableCell>Timestamp</TableCell>
                                    <TableCell>Bid Amount</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {filteredBids.map((bid, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{bid.bidder}</TableCell>
                                      <TableCell>
                                          {new Date(bid.timestamp).toLocaleString()}
                                        </TableCell>
                                      <TableCell>{bid.amount}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            className=""
                            color="secondary"
                            onClick={handleBidsDialogClose}
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>

                      <TableCell>
                        <VisibilityIcon
                          onClick={() => handleCommentsDialogOpen(result.uuid)}
                        />
                        {resultComments.length} comments
                      </TableCell>
                      <Dialog
                        open={isCommentsDialogOpen}
                        onClose={handleCommentsDialogClose}
                      >
                        <DialogTitle>Comments Details</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            <Box minWidth={400}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Timestamp</TableCell>
                                    <TableCell>Comment</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {filteredComments.map((comment, index) => {
                                    return (
                                      <TableRow key={index}>
                                        <TableCell>
                                          {comment.username}
                                        </TableCell>
                                        <TableCell>
                                          {new Date(comment.timestamp).toLocaleString()}
                                        </TableCell>
                                        <TableCell>{comment.message}</TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>
                              </Table>
                            </Box>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            className=""
                            color="secondary"
                            onClick={handleCommentsDialogClose}
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
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
                  )
                })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredResults.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}

const useStyles = theme => ({
  activeField: {
    flexBasis: 200
  },
  bulkOperations: {
    position: "relative"
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: "absolute",
    width: "100%",
    zIndex: 2
  },

  categoryField: {
    flexBasis: 200
  },

  image: {
    height: 68,
    width: 68
  },
  root: {},
  queryField: {
    width: 500
  }
})

export default Results