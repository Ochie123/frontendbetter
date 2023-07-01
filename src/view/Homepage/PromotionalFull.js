import { useMediaQuery, Grid } from '@mui/material';

import Promotional from "./Promotional";

// https://source.unsplash.com/XyONj_Aq-rg

// https://unsplash.com/photos/RGxEXgEym5U
export default function PromotionalFull() {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
      <div className="promotional-full-container">
        <div className="container">
        <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Promotional
            pageHeaderBgImg=""
            pageHeaderMinVh="50vh"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="row justify-content-center">
  
          <img
            src="https://source.unsplash.com/RGxEXgEym5U"
            alt="Promotional Image"
            style={{ width: "100%", height: "100%" }}
          />
          <h1 className="text-blue mb-4">Find the car you need!</h1>
   
          </div>
        </Grid>
        </Grid>
        </div>
      
      </div>
    );
  }