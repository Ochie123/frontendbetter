import React, { useState } from "react"
import clsx from "clsx"
import numeral from "numeral"
import PerfectScrollbar from "react-perfect-scrollbar"
import BidsModal from "./BidsModal"

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {
  Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from "react-feather"
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  createStyles,
 
} from "@mui/material"

import {
  availabilityOptions,
  categoryOptions,
  sortOptions
} from '../../../../others/helpers/InputProductOptions'
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


const Results = ({ className, results, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {classes} = useStyles(createStyles)
  const [selectedResults, setSelectedResults] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState(sortOptions[0].value)
  const [filters, setFilters] = useState({
    category: null,
    availability: null,
    inStock: null,
    bestdeals: null
  })



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

  const handleAvailabilityChange  = event => {
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

  // Usually query is done on backend with indexing solutions
  const filteredResults = applyFilters(results, query, filters)
  const paginatedResults = applyPagination(filteredResults, page, limit)
  const enableBulkOperations = selectedResults.length > 0
  const selectedSomeResults =
    selectedResults.length > 0 && selectedResults.length < results.length
  const selectedAllResults = selectedResults.length === results.length

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
            value={filters.availability || 'all'}
            variant="outlined"
          >
            {availabilityOptions.map(avalabilityOption => (
              <option key={avalabilityOption.id} value={avalabilityOption.id}>
                {avalabilityOption.name}
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
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllResults}
              indeterminate={selectedSomeResults}
              onChange={handleSelectAllResults}
            />
            <Button variant="outlined" className={classes.bulkAction}>
              Delete
            </Button>
            <Button variant="outlined" className={classes.bulkAction}>
              Edit
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={1200}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllResults}
                    indeterminate={selectedSomeResults}
                    onChange={handleSelectAllResults}
                  />
                </TableCell>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Bids</TableCell>
                
                <TableCell>Attributes</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedResults.map(result => {
                const isResultSelected = selectedResults.includes(result.uuid)

                return (
                  <TableRow hover key={result.uuid} selected={isResultSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isResultSelected}
                        onChange={event =>
                          handleSelectOneResult(event, result.uuid)
                        }
                        value={isResultSelected}
                      />
                    </TableCell>
                    <TableCell className="">
                      {result.image ? (
                        <img
                          alt="Product"
                          src={result.image}
                          className={classes.image}
                        />
                      ) : (
                        <Box p={2} bgcolor="background.dark">
                          <SvgIcon>
                            <ImageIcon />
                          </SvgIcon>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>{result.name}</TableCell>

                    <TableCell>
            
                      {result.make}</TableCell>

                    <TableCell>
                      {result.quantity} in stock
                      {result.variants > 1 &&
                        ` in ${result.variants} variants`}
                    </TableCell>
                    <TableCell>
                 
      <Button onClick={handleOpen}>
      
      {result.bids}

      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Overview
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Bids: {result.bids}

              {results.map(result  => (
          <li key={result.id}>{result.bids}</li>
        ))}
          </Typography>
        </Box>
      </Modal>
    
                    </TableCell>
                    <TableCell>
                      {result.name}
                    </TableCell>
                    <TableCell>
                      {numeral(result.price).format(
                        `${result.currency}0,0.00`
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
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
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}

const useStyles = (theme) => ({
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
    zIndex: 2,
 
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
  },

})

export default Results;
