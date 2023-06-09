import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Typography } from '@mui/material';

import { SelectedFiltersContext } from './SelectedFiltersContext';
import { Hbox } from '../option/Box';

const PREFIX = 'RSFFilterFooter';

const defaultClasses = {
  root: `${PREFIX}-root`,
  itemsFound: `${PREFIX}-itemsFound`,
};

const StyledHbox = styled(Hbox)(({ theme }) => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${defaultClasses.root}`]: {
    backgroundColor: theme.palette.secondary.main,
    padding: '12px 20px',
    color: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /**
   * Styles applied to the "# items found" label.
   */
  [`& .${defaultClasses.itemsFound}`]: {
    color: theme.palette.secondary.contrastText,
  },
}));

/**
 * A footer to be placed at the bottom of the [`Filter`](/apiReference/plp/Filter).
 */
export default function FilterFooter(props) {
  const { selectedFilters } = useContext(SelectedFiltersContext);
  const { classes: c = {}, submitOnChange, onViewResultsClick } = props;
  const classes = { ...defaultClasses, ...c };
  const mobileDevice = useMediaQuery('(max-width:650px)');

  // Hardcoded filters and filtersChanged data for testing purposes
  const filters = ['Filter 1', 'Filter 2'];
  console.log(selectedFilters.length);

  const filtersChanged = true;

  if (!selectedFilters || !filtersChanged || submitOnChange) return null;

  return (
    <>
      {mobileDevice ? (
        <StyledHbox className={classes.root} justify="space-between">
          <Typography variant="subtitle1" className={classes.itemsFound}>
            {selectedFilters.length || 'No'} filter
            {selectedFilters.length === 1 ? '' : 's'} selected
          </Typography>
          <Button variant="contained" size="large" onClick={onViewResultsClick} color="primary">
            View Results
          </Button>
        </StyledHbox>
      ) : (
        <>
          <Typography variant="subtitle1" className={classes.itemsFound}>
            {selectedFilters.length || 'No'} filter
            {selectedFilters.length === 1 ? '' : 's'} selected
          </Typography>
          <Button variant="contained" size="large" onClick={onViewResultsClick} color="primary">
            View Results
          </Button>
        </>
      )}
    </>
  );
}

FilterFooter.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * Set to `true` if the filters will be submitted when changed. In this case, the footer will not be shown.
   */
  submitOnChange: PropTypes.bool,

  /**
   * Function to call when the "View Results" button is clicked.
   */
  onViewResultsClick: PropTypes.func,
};
