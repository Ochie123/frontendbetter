import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import Page from '../../components/Page';

import Advert from './Advert';
import NewlyListed from './NewlyListed';
import EndingSoon from './EndingSoon';
import PromotionalFull from './PromotionalFull';

function View () {

    return (
        <>
        <PromotionalFull/>
        <NewlyListed/>
        <EndingSoon/>
        </>
    )

}
export default View;