import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import { Link} from "react-router-dom";
//"https://source.unsplash.com/aGLSS4bcaTc" 

//https://source.unsplash.com/xDW_RJ9O2i4
//https://source.unsplash.com/Ek41BxE3B3c
//https://source.unsplash.com/Ek41BxE3B3c

function CarType() {
      return (
     <>
     <Link to={`/auctions/`}>
    <Card variant="outlined" sx={{ width: 320 }}>
       <Typography level="h2" fontSize="XL" sx={{ mb:0 }}>
         <img
          src="https://source.unsplash.com/aGLSS4bcaTc" 
          loading="lazy"
          alt="" width="300" 
         />
        </Typography>
        <Box sx={{ display: 'flex' }}>
        <div>
          <Typography fontSize="lg" fontWeight="lg">
            SUV
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Explore
        </Button>
      </Box>
  </Card>
  </Link>
  <Link to={`/auctions/`}>
  <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="XL" sx={{ mb: 0 }}>
      <img
        src="https://source.unsplash.com/xDW_RJ9O2i4" 
        loading="lazy"
        alt="" width="300" 
      />
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography fontSize="lg" fontWeight="lg">
            SEDAN
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Explore
        </Button>
      </Box>
  </Card>
  </Link>
  <Link to={`/auctions/`}>
  <Card variant="outlined" sx={{ width: 320 }}>
    <Typography level="h2" fontSize="XL" sx={{ mb: 0}}>
      <img
        src="https://sourc" 
        loading="lazy"
        alt="" width="300" 
      />
    </Typography>
    <Box sx={{ display: 'flex' }}>
        <div>
          <Typography fontSize="lg" fontWeight="lg">
            HATCHBACK
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Explore
        </Button>
      </Box>
  </Card>
  </Link>
  <Link to={`/auctions/`}>
  <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="XL" sx={{ mb: 0 }}>
        <img
          src="https://source.unsplash.com/Ek41BxE3B3c" 
          loading="lazy"
          alt="" width="300" 
        />
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography fontSize="lg" fontWeight="lg">
            WAGON
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Explore
        </Button>
      </Box>
      </Card>
      </Link>
    </> 
)
}
export default CarType;