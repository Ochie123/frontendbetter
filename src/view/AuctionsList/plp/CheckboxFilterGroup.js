import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState,createContext, useContext } from 'react';
import { Checkbox, FormGroup, Typography, FormControlLabel } from '@mui/material';


import { SelectedFiltersContext } from './SelectedFiltersContext';

const PREFIX = 'RSFCheckboxFilterGroup';

const defaultClasses = {
  matches: `${PREFIX}-matches`,
  groupLabel: `${PREFIX}-groupLabel`,
};

const StyledFormGroup = styled(FormGroup)(() => ({
  /**
   * Styles applied to the matching text.
   */
  [`& .${defaultClasses.matches}`]: {
    marginLeft: 'auto',
    display: 'inline',
  },

  /**
   * Styles applied to the group label element.
   */
  [`& .${defaultClasses.groupLabel}`]: {
    display: 'flex',
    alignItems: 'center',
  },
}));

/**
 * A UI for grouping filters using checkboxes.
 */
export default function CheckboxFilterGroup(props) {
  const { group, submitOnChange, classes: c = {}, onSelectedFiltersChange } = props;

  const classes = { ...defaultClasses, ...c };
  const { selectedFilters, setSelectedFilters } = useContext(SelectedFiltersContext);


  // Hardcoded filters data for testing purposes
  //const [selectedFilters, setSelectedFilters] = useState([]);


  const toggleFilter = (facet) => {
    setSelectedFilters((prevFilters) => {
      const filterIndex = prevFilters.indexOf(facet.code);
      if (filterIndex === -1) {
        return [...prevFilters, facet.code];
      } else {
        return prevFilters.filter((_, index) => index !== filterIndex);
      }
    });
  
    if (submitOnChange) {
      onSelectedFiltersChange(selectedFilters);
    }
  };
  
  

  const onViewResultsClick = (selectedFilters) => {
    // Implement your onViewResultsClick logic here
    console.log(selectedFilters);
  };

  useEffect(() => {
    console.log(selectedFilters); // Log the updated selectedFilters state
  }, [selectedFilters]);

  // Notify parent component of the updated selectedFilters state
  useEffect(() => {
    onSelectedFiltersChange(selectedFilters);
  }, [selectedFilters, onSelectedFiltersChange]);

  return (
    <SelectedFiltersContext.Provider value={[selectedFilters, setSelectedFilters]}>
    <StyledFormGroup>
      {group.options.map((facet, i) => (
        <FormControlLabel
          key={i}
          label={
            <div className={classes.groupLabel}>
              <span>{facet.name}</span>
              <Typography variant="caption" className={classes.matches} component="span">
                ({facet.matches})
              </Typography>
            </div>
          }
          control={
            <Checkbox
              checked={selectedFilters.includes(facet.code)}
              color="primary"
              onChange={() => toggleFilter(facet)}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          }
        />
      ))}
    </StyledFormGroup>
    </SelectedFiltersContext.Provider>
  );
}

CheckboxFilterGroup.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * Contains data for the group to be rendered.
   */
  group: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        matches: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image: PropTypes.object,
      })
    ),
  }),
  /**
   * Set to `true` to refresh the results when the user toggles a filter.
   */
  submitOnChange: PropTypes.bool,
  /**
   * Callback function invoked when the selected filters change.
   * It receives the updated selectedFilters state as an argument.
   */
  onSelectedFiltersChange: PropTypes.func,
};
