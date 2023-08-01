import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik"
import { useSnackbar } from "notistack"
import Container from 'react-bootstrap/Container';
//import Select from 'react-select';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import FilesDropzone from "../../../../components/Files-Dropzone";
import QuillEditor from "../../../../components/Quill-Editor";
import { useQuery } from "react-query";
import { loadCars_Specifications, loadCategories } from '../../../../data/api/api'
import { loadMakes } from '../../../../data/api/api'
import { loadModels } from '../../../../data/api/api'
import { YupAuctionValidation } from "./schema/YupAuctionValidation"
import { AuctionDefaultValue } from "./schema/AuctionDefaultValue"
import { useNavigate } from "react-router"
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import { saveClaimsAction, saveTokenAction } from '../../../../features/auth/authSlice'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const AuctionCreateForm = props => {
  const theme = useTheme();
  const [auctionChoices, setAuctionChoices] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const key = "token"
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data: categoriesData = { results: [] } } = useQuery('categories', loadCategories);
  const categories = categoriesData.results;

  const { data: makesData = { results: [] } } = useQuery('makes', loadMakes);
  const makes = makesData.results;

  const { data: modelsData = { results: [] } } = useQuery('models', loadModels);
  const models = modelsData.results;

  const { data: cars_SpecificationsData = { results: [] } } = useQuery('cars_specifications', loadCars_Specifications);
  const carSpecifications = cars_SpecificationsData.results;


  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMake, setSelectedMake] = useState("");

  function getStyles(car_specification, personCar_specification, theme) {
    return {
      fontWeight:
      personCar_specification.indexOf(car_specification) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

  //const [car_specifications, setCarSpecifications] = useState([]);
  const [personCar_specification, setPersonCar_specification] = useState([]);

  //const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonCar_specification(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState("")

  
  const saveUserAuthDetails = (data) => {
    localStorage.setItem(key,data.access);
    const claims = jwt_decode( data.access);
    console.log('Claims::', claims);
    dispatch(saveTokenAction( data.access));
    dispatch(saveClaimsAction(claims));
  };

  useEffect(() => {
    // Reset selected make when the selected category changes
    setSelectedMake("");
  }, [selectedCategory]);


  useEffect(() => {
    const fetchAuctionChoices = async () => {
      try {
        const response = await axios.get("https://cars-bids.online/trader/api/auction-choices/");
        setAuctionChoices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuctionChoices();
  }, []);

 
  //console.log(carSpecifications);
  //const names = carSpecifications.map(specification => specification.name);
  

  //const handleSpecificationChange = selectedOptions => {
    //setSelectedSpecification(selectedOptions);
  //};

  // Handle the change event for the type selection
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  // Handle the change event for the year selection
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Handle the change event for the duration selection
  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  return (
    <Container>

    <Formik
      initialValues={AuctionDefaultValue}
      validationSchema={YupAuctionValidation}
      onSubmit={async (values, formikHelpers) => {
        console.log(values);

        
        try {
          const token = localStorage.getItem('token');
          //console.log(token);
      
          const formData = new FormData();
          values.uploaded_images.forEach((file, index) => {
            formData.append(`uploaded_images[${index}]`, file);
          });
          // Append other form fields to the formData object
          const carSpecifications = values.car_specification || []; // Make sure it's an array

          carSpecifications.forEach(specification => {
            formData.append('car_specification', specification);
          });
          formData.append('category', values.category);
          formData.append('make', values.make);
          formData.append('model', values.model);
          formData.append('duration', values.duration);
          formData.append('overview', values.overview);
          formData.append('start_time', values.start_time);
          formData.append('type', values.type);
          formData.append('name', values.name);
          formData.append('reserveprice', values.reserveprice);
         // formData.append('car_specification', values.car_specification);
          formData.append('year', values.year);
          formData.append('starting_price', values.starting_price);
          // ... append other form fields
      
          const response = await axios.post('https://cars-bids.online/api/auctions/', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
      
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar('Auction Created', {
            variant: 'success',
          });
          // Redirect or perform any other necessary action
          //console.log(response)
          //console.log('Auction created:', response.data);
          navigate('/list-auctions');
        } catch (err) {
          alert('Something happened. Please try again.');
          setError(err.message);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
        //console.log(err.message)
      }}
      
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit} className="">
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
              <CardContent>
                  <TextField
                    error={Boolean(
                      formikProps.touched.name && formikProps.errors.name
                    )}
                    fullWidth
                    helperText={
                      formikProps.touched.name && formikProps.errors.name
                    }
                    label="Auction Name"
                    name="name"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    value={formikProps.values.name}
                    variant="outlined"
                  />
                  <Box mt={3} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Overview
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className=""
                      value={formikProps.values.overview}
                      onChange={value =>
                        formikProps.setFieldValue("overview", value)
                      }
                    />
                  </Paper>
                  {formikProps.touched.overview &&
                    formikProps.errors.overview && (
                      <Box mt={2}>
                        <FormHelperText error>
                          {formikProps.errors.overview}
                        </FormHelperText>
                      </Box>
                    )}
                </CardContent>
              </Card>
              <Box mt={3}>
      <Card>
        <CardHeader title="Upload Images" />
        <Divider />
        <CardContent>
          <FilesDropzone onFilesChange={(files) => formikProps.setFieldValue('uploaded_images', files)} />

          {formikProps.touched.uploaded_images &&
            formikProps.errors.uploaded_images && (
              <Box mt={2}>
                <FormHelperText error>
                  {formikProps.errors.uploaded_images}
                </FormHelperText>
              </Box>
            )}
        </CardContent>
      </Card>
    </Box>
              
              <Box mt={3}>
                <Card>
                  <CardHeader title="Prices" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            formikProps.touched.starting_price &&
                              formikProps.errors.starting_price
                          )}
                          fullWidth
                          helperText={
                            formikProps.touched.starting_price &&
                            formikProps.errors.starting_price
                              ? formikProps.errors.starting_price
                              : " This is optional. It will be shown as starting bid."
                          }
                          label="Starting Bid"
                          name="starting_price"
                          type="number"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.starting_price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            formikProps.touched.reserveprice &&
                              formikProps.errors.reserveprice
                          )}
                          fullWidth
                          helperText={
                            formikProps.touched.reserveprice &&
                            formikProps.errors.reserveprice
                            ? formikProps.errors.reserveprice
                            : " This is optional. Only you can see the Reserve price."
                          }
                          label="Reserve price"
                          name="reserveprice"
                          type="number"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.reserveprice}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formikProps.values.isTaxable}
                            onChange={formikProps.handleChange}
                            value={formikProps.values.isTaxable}
                            name="isTaxable"
                          />
                        }
                        label="Product is taxable"
                      />
                    </Box>
                    <Box mt={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formikProps.values.includesTaxes}
                            onChange={formikProps.handleChange}
                            value={formikProps.values.includesTaxes}
                            name="includesTaxes"
                          />
                        }
                        label="Price includes taxes"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>

            </Grid>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardHeader title="Organize" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    select
                    value={formikProps.values.category}
                    onChange={event => {
                      const selectedCategory = event.target.value;
                      setSelectedCategory(selectedCategory);
                      formikProps.handleChange(event);
                    }}
                    variant="outlined"
                  >
                    {categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Divider />  
                  <br/>
                  <TextField
                    fullWidth
                    label="Make"
                    name="make"
                    select
                    value={formikProps.values.make}
                    onChange={event => {
                      const selectedMake = event.target.value;
                      setSelectedMake(selectedMake);
                      formikProps.handleChange(event);
                    }}
                    variant="outlined"
                    disabled={!selectedCategory}
                  >
                    {makes
                      .filter(make => make?.category === selectedCategory)
                      .map(make => (
                        <MenuItem key={make.id} value={make.id}>
                          {make.name}
                        </MenuItem>
                      ))}
                  </TextField>

                  <Divider />
                  <br/>
                  <TextField
                    fullWidth
                    label="Model"
                    name="model"
                    select
                    value={formikProps.values.model}
                    onChange={formikProps.handleChange}
                    variant="outlined"
                    disabled={!selectedMake}
                  >
                    {models
                      .filter(model => model?.make === selectedMake)
                      .map(model => (
                        <MenuItem key={model.id} value={model.id}>
                          {model.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  <Divider />
                </CardContent>
                <Divider/>

                <CardContent>
                {auctionChoices && (
                 <div>
         
                 <TextField
                   fullWidth
                    label="Type"
                    name="type"
                    select
                    value={formikProps.values.type}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.type && Boolean(formikProps.errors.type)}
                    helperText={formikProps.touched.type && formikProps.errors.type}
                    variant="outlined"
                   >
                  <MenuItem value="">Select a type</MenuItem>
                    {auctionChoices.supported_types.map(([value, label]) => (
                     <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                    ))}
                </TextField>
                <Divider />
                 <br/>
               <TextField
                  fullWidth
                   label="Year"
                   name="year"
                  select
                  value={formikProps.values.year}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.year && Boolean(formikProps.errors.year)}
                  helperText={formikProps.touched.year && formikProps.errors.year}
                  variant="outlined"
                  >
                 <MenuItem value="">Select a year</MenuItem>
                   {auctionChoices.supported_years.map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                 ))}
                </TextField>

                <Divider />
                 <br/>
                 <TextField
                  fullWidth
                  label="Duration"
                  name="duration"
                  select
                  value={formikProps.values.duration}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.duration && Boolean(formikProps.errors.duration)}
                  helperText={formikProps.touched.duration && formikProps.errors.duration}
                  variant="outlined"
                  >
                  <MenuItem value="">Select a duration</MenuItem>
                  {auctionChoices.duration_choices.map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                     {label}
                  </MenuItem>
                  ))}
                  </TextField>
                  </div>
                  )}
                </CardContent>

                <Divider />
                <CardContent>
                <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Features</InputLabel>
        <Field
          as={Select}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name="car_specification"
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          onBlur={formikProps.handleBlur}
          error={formikProps.touched.car_specification && Boolean(formikProps.errors.car_specification)}
          helperText={formikProps.touched.car_specification && formikProps.errors.car_specification}
          variant="outlined"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
           {selected.map((value) => {
      const carSpecification = carSpecifications.find(spec => spec.id === value);
      return (
        <Chip key={value} label={carSpecification ? carSpecification.name : ''} />
      );
    })}
            </Box>
          )}
          onChange={(event) => {
            formikProps.setFieldValue('car_specification', event.target.value);
          }}
          
          
          value={formikProps.values.car_specification || []}
        >
          {carSpecifications.map(car_specification => (
            <MenuItem
              key={car_specification.id}
              value={car_specification.id}
              style={getStyles( car_specification,personCar_specification, theme)}
            >
              {car_specification.name}
            </MenuItem>
          ))}

        </Field>

      </FormControl>
    </div>


                    </CardContent>
                    <Divider />
                 <br/>
                <Divider/>

                 <TextField
                   fullWidth
                    label="Start Time"
                    name="start_time"
                    type="datetime-local"
                    value={formikProps.values.start_time}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.start_time && Boolean(formikProps.errors.start_time)}
                    helperText={formikProps.touched.start_time && formikProps.errors.start_time}
                    variant="outlined"
                    />

     
              </Card>
            </Grid>
          </Grid>
          {error && (
            <Box mt={3}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              Create auction
            </Button>
          </Box>
        </form>
      )}
    </Formik>
    </Container>
  );
};

export default AuctionCreateForm;
      
