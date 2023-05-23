import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";

import FilesDropzone from "../../../../components/Files-Dropzone";
import QuillEditor from "../../../../components/Quill-Editor";
import { useQuery } from "react-query";
import { loadCategories } from '../../../../data/api/api'
import { loadMakes } from '../../../../data/api/api'
import { loadModels } from '../../../../data/api/api'

import { useAllMakes } from '../../../../data'
import { useThisMake } from '../../../../data'

import { useAllModels } from '../../../../data'
import { useThisModel } from '../../../../data'


const AuctionCreateForm = ({ className,  id,  onSubmit }) => {

  const { data = { results: [] }} = useQuery("categories", loadCategories);
  const categories = data.results;

  const { datas = { results: [] }} = useQuery("makes", loadCategories);
  const makes = datas.results;

  const { datsa = { results: [] }} = useQuery("models", loadCategories);
  const models = datsa.results;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMake, setSelectedMake] = useState("");

  console.log(makes)




  useEffect(() => {
    // Reset selected make when the selected category changes
    setSelectedMake("");
  }, [selectedCategory]);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        category: "",
        make: "",
        model: ""
      }}
      onSubmit={onSubmit}
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit} className={className}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formikProps.values.name}
                    onChange={formikProps.handleChange}
                    variant="outlined"
                  />
                  <Box mt={3} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Description
                    </Typography>
                  </Box>
                  {/* QuillEditor component */}
                </CardContent>
              </Card>
              {/* FilesDropzone component */}
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* Submit button */}
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
  );
};

export default AuctionCreateForm;
      
