import React, { useState, useContext } from 'react';
//import { makeStyles } from '@material-ui/styles'; 
import { Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import { loadAuctions } from '../../data/api/api'
import { loadUser } from '../../data/api/api'
import { useThisUser } from '../../data';
import { loadAuction } from '../../data/api/api'
import './ProfileId.css'
//const useStyles = makeStyles(theme => ({ card: {
 //   maxWidth: 400
 // },
 // expand: {
 //   marginLeft: 'auto'
//} }));


const ExpandIcon = ({ expanded }) =>
    expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;


function ProfileId({ownerId}){
    const { id } = useParams();
    //const classes = useStyles()
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => { setExpanded(!expanded);
    };

    const { data:auctionsData = { results: [] }} = useQuery("auctions", loadAuctions);
    const auctions = auctionsData.results;

    const { data: auction } = useQuery(["currentAuction", { id }], () =>
    loadAuction(id)
  );

    console.log(id);

    console.log(auctions)
  
   

    const filteredAuctions = auctions.filter(auction => auction.owner_id === ownerId);
    console.log(filteredAuctions)
    //let auctionss = auctions.filter((auction) => owner.auction === owner.id);
    //let productComments = comments.filter((comment) => comment.auction === auction?.uuid);
  

    
    return (
        <Card className="cards">
            <CardHeader title={auctions?.username} subheader="Legend" 
            avatar={
              <Avatar>
             <PersonIcon />
            </Avatar> 
            }
            />
            <CardContent>
            <Typography variant="caption">Joined 2009</Typography> 
            <Typography>
                Some filler text about the user. There doesn't have to be a
                lot - just enough so that the text spans at least two lines. 
                </Typography>
            </CardContent>
            <CardActions disableActionSpacing>
                 <IconButton>
                 <ContactMailIcon />
                </IconButton>
                <IconButton>
             <ContactPhoneIcon />
           </IconButton>
           <IconButton
            className=""
            onClick={toggleExpanded} >
            <ExpandIcon expanded={expanded} /> 
            </IconButton>
            </CardActions> <Collapse in={expanded}>
           <CardContent>
             <Typography>
                Even more filler text about the user. It doesn't fit in the main content area of the card, so this is what the user will see when they click the expand button.
             </Typography>
           </CardContent>
         </Collapse>
       </Card>
    )
}
export default ProfileId;