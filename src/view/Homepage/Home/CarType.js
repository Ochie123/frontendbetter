import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import { Link} from "react-router-dom";
//"https://unsplash.com/photos/JgAy9qUzbOo" 

//https://unsplash.com/photos/Pge-pnbGcRk
//https://unsplash.com/photos/hSLF2SRpxvk
//https://unsplash.com/photos/oIhGuaJ69MA

function CarType() {
      return (
     <>
     <Link to={`/auctions/`}>
    <Card variant="outlined" sx={{ width: 320 }}>
       <Typography level="h2" fontSize="XL" sx={{ mb:0 }}>
         <img
          src="https://source.unsplash.com/JgAy9qUzbOo" 
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
          aria-label="Explore"
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
        src="https://source.unsplash.com/Pge-pnbGcRk" 
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
          aria-label="Explore"
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
        src="https://source.unsplash.com/hSLF2SRpxvk" 
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
          aria-label="Explore"
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
          src="https://source.unsplash.com/oIhGuaJ69MA" 
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
          aria-label="Explore"
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