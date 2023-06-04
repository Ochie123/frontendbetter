import React, { useContext} from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


import { useQuery } from "react-query";
import Auction from './Auction';
import {AuctionContext} from '../DetailPage';

import { loadCars_Specifications } from '../../../data/api/api';

import ProductGallery from './ProductGallery'


export default function ProductOverview({
  name,
  overview,
  type,

})
{
  const [variant, setVariant] = React.useState('solid');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const buttonSize = isMobile ? 'sm' : 'md';
  const auction = useContext(AuctionContext);
  const { data: cars_SpecificationsData = { results: [] } } = useQuery('cars_specifications', loadCars_Specifications);
  const carSpecifications = cars_SpecificationsData.results;

  //console.log(carSpecifications)  
  
  const filteredFeatures = carSpecifications.filter(car_specification => auction?.car_specification?.includes(car_specification.id));
  //console.log(filteredFeatures)

  return (
    <>
       <ProductGallery/>
      
    <div className="card card-product card-plain">
 
   
      <div className="row mt-5">
        <div className="col-12 col-lg-8 border-end">
    <Tabs
      size="sm"
      aria-label="Pricing plan"
      defaultValue={0}
      sx={(theme) => ({
        width: 'auto',
        '--Tabs-gap': '0px',
        borderRadius: 'lg',
        boxShadow: 'sm',
        overflow: 'auto',
        border: `1px solid ${theme.vars.palette.divider}`,
      })}
    >
      <TabList
        sx={{
          '--ListItem-radius': '0px',
          borderRadius: 0,
          [`& .${tabClasses.root}`]: {
            fontWeight: 'lg',
            flex: 1,
            bgcolor: 'background.body',
            position: 'relative',
            [`&.${tabClasses.selected}`]: {
              color: 'primary.500',
            },
            [`&.${tabClasses.selected}:before`]: {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: -1,
              width: '100%',
              height: 2,
              bgcolor: 'primary.400',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-3px',
            },
          },
        }}
      >
        <Tab sx={{ py: 1.5 }}>Features</Tab>
        <Tab>Highlights</Tab>
        <Tab>Flaws</Tab>
      </TabList>
      <TabPanel value={0} sx={{ p: 3 }}>
        <Typography level="inherit">
        <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(auto, 1fr))',
          gap: 1,
        }}
      >
          {carSpecifications.map(car_specification => ( 
            <Button size={buttonSize} variant={variant} key={car_specification.id} style={{ backgroundColor: filteredFeatures.includes(car_specification) ? 'green' : 'yellow' }}>
              {car_specification.name}
              </Button>
          ))}
      </Box>
      <Sheet
        sx={{
          background: 'transparent',
          pl: 4,
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          level="body2"
          fontWeight="xl"
          id="variant-label"
          textColor="text.primary"
          mb={1}
        >
         
        </Typography>
    
      </Sheet>
    </Box>

  
        </Typography>
      </TabPanel>
      <TabPanel value={1} sx={{ p: 3 }}>
        <Typography level="inherit">
        {(name?.length !== 0) && 
            <h2>{name}</h2>
          }
          {(overview?.length !== 0) && 
            <p>{overview}</p>
          }
          {(type?.length !== 0) && 
           <>
             <h6>Highlights</h6>
              <ul className="text-sm">
              {type}
              </ul>
           </>
          }
           {(overview?.length !== 0) && 
            <>
              <h6>Details</h6>
              <p>{overview}</p>
            </>
           }
        </Typography>
      </TabPanel>
      <TabPanel value={2} sx={{ p: 3 }}>
        <Typography level="inherit">
          Vehicle flaws.
        </Typography>
      </TabPanel>
    </Tabs>
        </div>
        <div className="col-12 col-lg-4 ps-4">

        <Auction/>

        </div>


      </div>
    </div>
    </>
  );
};
