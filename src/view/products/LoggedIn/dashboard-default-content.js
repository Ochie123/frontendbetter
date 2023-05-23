import React, { useEffect, useState } from 'react';
//import Chart from 'react-apexcharts';
//import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,

} from '@mui/material';

import Page from '../../../components/Page'
//import { SaleType } from 'models/sale-type';
//import { getSalesAxios } from 'services/saleService';

const DashboardDefaultContent = () => {
  //const classes = useStyles();
  //const theme = useTheme();

  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales().then();
  }, []);

  const fetchSales = async () => {
    //const { data } = await getSalesAxios();
    //setSales(data);
  };

  return (
    <Page className="" title="Dashboard">
      {/*The maxWidth adjusts the width of the chart.
      This can be improved by making it responsive to mobile UI.*/}
      <Container maxWidth={'sm'}>
        <Typography variant="h4" color="textPrimary">
          Dashboard
        </Typography>
        <Box my={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" color="textPrimary">
                    Sales
                  </Typography>
                  <h2>Sales here</h2>
                
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default DashboardDefaultContent;



