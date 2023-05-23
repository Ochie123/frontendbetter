import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
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
  TextField,
  Typography,
} from "@mui/material";

import FilesDropzone from "../../../../components/Files-Dropzone";
import QuillEditor from "../../../../components/Quill-Editor";
import axios from "axios";

const ProductCreateForm = ({ className, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    try {
      const response = await axios.get(`/api/categories/${categoryId}/makes/`);
      setMakes(response.data);
      setModels([]);
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  };

  const handleMakeChange = async (makeId) => {
    try {
      const response = await axios.get(`/api/makes/${makeId}/models/`);
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        category: "",
        make: "",
        model: "",
        name: "",
        // Other form fields
      }}
      onSubmit={(values, formikHelpers) => {
        console.log(values);
      }}
    >
      {(formikProps) => (
        <form
          onSubmit={formikProps.handleSubmit}
          className={clsx("", className)}
          {...rest}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    value={formikProps.values.name}
                    variant="outlined"
                  />
                  <Box mt={3} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className=""
                      value={formikProps.values.description}
                      onChange={(value) =>
                        formikProps.setFieldValue("description", value)
                      }
                    />
                  </Paper>
                  {formikProps.touched.description &&
                    formikProps.errors.description && (
                      <Box mt={2}>
                        <FormHelperText error>
                          {formikProps.errors.description}
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
                    <FilesDropzone />
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
                            formikProps.touched.price &&
                              formikProps.errors.price
                          )}
                          fullWidth
                          helperText={
                            formikProps.touched.price &&
                            formikProps.errors.price
                              ? formikProps.errors.price
                              : "If you have a sale price this will be shown as old price"
                          }
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(
                            formikProps.touched.salePrice &&
                              formikProps.errors.salePrice
                          )}
                          fullWidth
                          helperText={
                            formikProps.touched.salePrice &&
                            formikProps.errors.salePrice
                          }
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                          value={formikProps.values.salePrice}
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
                    onChange={(e) => {
                      formikProps.handleChange(e);
                      handleCategoryChange(e.target.value);
                    }}
                    select
                    SelectProps={{ native: true }}
                    value={formikProps.values.category}
                    variant="outlined"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}    
                    </TextField>           
                  <TextField
                    fullWidth
                    label="Make"
                    name="make"
                    onChange={(e) => {
                      formikProps.handleChange(e);
                      handleMakeChange(e.target.value);
                    }}
                    select
                    SelectProps={{ native: true }}
                    value={formikProps.values.make}
                    variant="outlined"
                  >
                    <option value="">Select a make</option>
                    {makes.map((make) => (
                      <option key={make.id} value={make.id}>
                        {make.name}
                      </option>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="Model"
                    name="model"
                    onChange={formikProps.handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={formikProps.values.model}
                    variant="outlined"
                  >
                    <option value="">Select a model</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </TextField>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(
                        formikProps.touched.productCode &&
                          formikProps.errors.productCode
                      )}
                      fullWidth
                      helperText={
                        formikProps.touched.productCode &&
                        formikProps.errors.productCode
                      }
                      label="Product Code"
                      name="productCode"
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.productCode}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(
                        formikProps.touched.productSku &&
                          formikProps.errors.productSku
                      )}
                      fullWidth
                      helperText={
                        formikProps.touched.productSku &&
                        formikProps.errors.productSku
                      }
                      label="Product Sku"
                      name="productSku"
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.productSku}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {/* Rest of the form layout */}
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
              Create product
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ProductCreateForm;
