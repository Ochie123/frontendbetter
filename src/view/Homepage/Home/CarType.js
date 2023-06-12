import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import { Link} from "react-router-dom";
//"https://source.unsplash.com/sshRwdjWubE" 

//https://source.unsplash.com/dhaew2IpTo0
//https://source.unsplash.com/5UMzgCe4fBA
//https://source.unsplash.com/utPwMB3aCWM

function CarType() {
      return (
     <>
     <Link to={`/auctions/`}>
    <Card variant="outlined" sx={{ width: 320 }}>
       <Typography level="h2" fontSize="XL" sx={{ mb:3 }}>
         <img
          src="https://source.unspl" 
          loading="lazy"
          alt="" width="200" 
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
      <Typography level="h2" fontSize="XL" sx={{ mb: 3 }}>
      <img
        src="https://source.unsplas" 
        loading="lazy"
        alt="" width="200" 
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
    <Typography level="h2" fontSize="XL" sx={{ mb: 3}}>
      <img
        src="https://sourc" 
        loading="lazy"
        alt="" width="200" 
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
      <Typography level="h2" fontSize="XL" sx={{ mb: 3 }}>
        <img
          src="https://sou" 
          loading="lazy"
          alt="" width="200" 
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