import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import { Button, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const PREFIX = 'RSFSort';

const defaultClasses = {
  container: `${PREFIX}-container`,
  option: `${PREFIX}-option`,
};

/**
 * UI for sorting a list of products.  This component can be used on its own, or you can use
 * [`SortButton`](/apiReference/plp/SortButton) to automatically display this component in a drawer
 * that slides up from the bottom of the viewport.
 */
var Sort = function ({ variant, classes: c = {}, onSelect }) {
  const classes = { ...defaultClasses, ...c };

  // Hardcoded values
  const sortOptions = [
    { name: 'Price - Lowest', code: 'price_asc' },
    { name: 'Price - Highest', code: 'price_desc' },
    { name: 'Highest - Voted', code: 'vote_dsc' },
    { name: 'Bids - Highest', code: 'bids_asc' },
    { name: 'Bids - Lowest', code: 'bids_dsc' },
    { name: 'Ending - Soonest', code: 'ending_dsc' },
    { name: 'Ending - Latest', code: 'ending_asc' },
  ];
  const sort = sortOptions[0].code; // Select the first option by default

  const handleClick = (option, e) => {
    onSelect(option, e);

    if (!e.defaultPrevented) {
      // Perform sorting logic
      console.log('Sorting by:', option.code);
    }
  };

  const renderButtons = () => (
    <div className={classes.container}>
      {sortOptions &&
        sortOptions.map((option, i) => (
          <Button
            className={classes.option}
            color={sort === option.code ? 'primary' : 'secondary'}
            variant="contained"
            onClick={(e) => handleClick(option, e)}
            key={i}
          >
            {option.name}
          </Button>
        ))}
    </div>
  );

  const renderMenu = () => (
    <>
      {sortOptions &&
        sortOptions.map((option, i) => (
          <MenuItem key={i} onClick={(e) => handleClick(option, e)}>
            {option.name}
          </MenuItem>
        ))}
    </>
  );

  if (variant === 'buttons') {
    return renderButtons();
  }
  if (variant === 'menu-items') {
    return renderMenu();
  }
  return null;
};

Sort.propTypes = {
  classes: PropTypes.object,
  onSelect: PropTypes.func,
  variant: PropTypes.oneOf(['menu-items', 'buttons']),
};

Sort.defaultProps = {
  onSelect: Function.prototype,
  variant: 'buttons',
};

const StyledSort = styled(Sort)(() => ({
  [`& .${defaultClasses.container}`]: {
    padding: '15px 0 0 15px',
  },
  [`& .${defaultClasses.option}`]: {
    boxShadow: 'none',
    width: 'calc(50% - 15px)',
    margin: '0 15px 15px 0',
  },
}));

export default memo(StyledSort);
