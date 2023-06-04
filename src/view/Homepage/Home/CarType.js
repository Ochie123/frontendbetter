import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';

function CarType() {
      return (
     <>
    <Card variant="outlined" sx={{ width: 320 }}>
       <Typography level="h2" fontSize="XL" sx={{ mb:3 }}>
         <img
          src="https://source.unsplash.com/aNwtUkpb3cU" 
          loading="lazy"
          alt="Maksym-Tymchyk" width="200" 
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


  <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="XL" sx={{ mb: 3 }}>
      <img
        src="https://source.unsplash.com/MOHTDu-68no" 
        loading="lazy"
        alt="Hanson-Lu" width="200" 
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

  <Card variant="outlined" sx={{ width: 320 }}>
    <Typography level="h2" fontSize="XL" sx={{ mb: 3}}>
      <img
        src="https://source.unsplash.com/fwYZ3B_QQco" 
        loading="lazy"
        alt="Oli-Woodman" width="200" 
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

  <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="XL" sx={{ mb: 3 }}>
        <img
          src="https://source.unsplash.com/W1goA26UBGo" 
          loading="lazy"
          alt="Miguel-Teirlinck" width="200" 
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
    </> 
)
}
export default CarType;