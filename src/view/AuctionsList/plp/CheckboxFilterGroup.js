import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import React, { useMemo } from 'react';
import { Checkbox, FormGroup, Typography, FormControlLabel } from '@mui/material';

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
    marginLeft: '5px',
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
  const { group, submitOnChange, classes: c = {} } = props;

  const classes = { ...defaultClasses, ...c };

  // Hardcoded filters data for testing purposes
  const filters = ['Filter 1'];

  const toggleFilter = (facet, submitOnChange) => {
    // Implement your toggleFilter logic here
  };

  return useMemo(
    () => (
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
                checked={filters.indexOf(facet.code) !== -1}
                color="primary"
                onChange={() => toggleFilter(facet, submitOnChange)}
              />
            }
          />
        ))}
      </StyledFormGroup>
    ),
    [...Object.values(props), filters]
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
};
