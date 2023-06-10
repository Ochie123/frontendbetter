import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState, createContext, useMemo, useContext } from 'react';
import { Checkbox, FormGroup, Typography, FormControlLabel } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ExpandableSection from '../option/ExpandableSection';
import FacetGroup from './FacetGroup';

import { SelectedFiltersContext } from './SelectedFiltersContext';

const PREFIX = 'RSFCheckboxFilterGroup';

const defaultClasses = {
  matches: `${PREFIX}-matches`,
  groupLabel: `${PREFIX}-groupLabel`,
  groupTitle: `${PREFIX}-groupTitle`,
};

const StyledFormGroup = styled(FormGroup)(() => ({
  [`& .${defaultClasses.matches}`]: {
    marginLeft: 'auto',
    display: 'inline',
  },
  [`& .${defaultClasses.groupLabel}`]: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const StyledExpandableSection = styled(ExpandableSection)(({ theme }) => ({
  [`& .${defaultClasses.groupTitle}`]: {
    [theme.breakpoints.up('sm')]: {
      fontWeight: 'bold',
    },
  },
}));

export default function CheckboxFilterGroup(props) {
  const {
    group,
    submitOnChange,
    defaultExpanded,
    ControlsComponent,
    controlsProps,
    listItemProps,
    onClose,
    isSimpleList,
    onSelectedFiltersChange,
    classes: c = {},
  } = props;

  const classes = { ...defaultClasses, ...c };
  const { selectedFilters, setSelectedFilters } = useContext(SelectedFiltersContext);

  const handleCheckboxChange = (e, facet) => {
    const isChecked = e.target.checked;
    const filterCode = facet.code;

    if (isChecked) {
      setSelectedFilters((prevFilters) => [...prevFilters, filterCode]);
    } else {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== filterCode)
      );
    }
  };

  useEffect(() => {
    //console.log(selectedFilters); // Log the updated selectedFilters state
  }, [selectedFilters]);

  // Notify parent component of the updated selectedFilters state
  useEffect(() => {
    onSelectedFiltersChange(selectedFilters);
  }, [selectedFilters, onSelectedFiltersChange]);

  return useMemo(() => {
    const filters = selectedFilters || [];

    const selection = [];

    for (const option of group.options) {
      if (filters.includes(option.code)) {
        selection.push(option);
      }
    }

    let Controls = ControlsComponent || FacetGroup;

    let caption = null;

    if (selection.length === 1) {
      caption = selection[0].name;
    } else if (selection.length > 0) {
      caption = `${selection.length} selected`;
    }

    return (
      <SelectedFiltersContext.Provider value={{ selectedFilters, setSelectedFilters }}>
        {isSimpleList ? (
          <ListItem {...listItemProps}>
            <span className={classes.groupTitle}>{group.name}</span>
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
                      onChange={(e) => handleCheckboxChange(e, facet)}
                    />
                  }
                />
              ))}
            </StyledFormGroup>
          </ListItem>
        ) : (
          <StyledExpandableSection
            title={group.name}
            caption={caption}
            defaultExpanded={defaultExpanded}
            classes={{ title: classes.groupTitle }}
          >
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
                      onChange={(e) => handleCheckboxChange(e, facet)}
                    />
                  }
                />
              ))}
            </StyledFormGroup>
          </StyledExpandableSection>
        )}
      </SelectedFiltersContext.Provider>
    );
  }, [
    group,
    submitOnChange,
    defaultExpanded,
    ControlsComponent,
    controlsProps,
    listItemProps,
    onClose,
    isSimpleList,
    selectedFilters,
    classes,
  ]);
}

CheckboxFilterGroup.propTypes = {
  classes: PropTypes.object,
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
  submitOnChange: PropTypes.bool,
  onSelectedFiltersChange: PropTypes.func,
};
