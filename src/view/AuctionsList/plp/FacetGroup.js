import React, { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ExpandableSection from '../option/ExpandableSection';
import CheckboxFilterGroup from './CheckboxFilterGroup';

const PREFIX = 'RSFFacetGroup';

const defaultClasses = {
  groupTitle: `${PREFIX}-groupTitle`,
};

const StyledExpandableSection = styled(ExpandableSection)(({ theme }) => ({
  /**
   * Styles applied to the group's title element.
   */
  [`& .${defaultClasses.groupTitle}`]: {
    [theme.breakpoints.up('sm')]: {
      fontWeight: 'bold',
    },
  },
}));

/**
 * A grouping of facets used for filtering products.
 */
export default function FacetGroup(props) {
  const {
    group,
    submitOnChange,
    defaultExpanded,
    ControlsComponent,
    controlsProps,
    listItemProps,
    onClose,
    isSimpleList,
    selectedFilters,
    onSelectedFiltersChange,
    classes: c = {},
  } = props;

  const classes = { ...defaultClasses, ...c };
  const [currentSelectedFilters, setCurrentSelectedFilters] = useState(selectedFilters || []);

  const handleSelectedFiltersChange = (filters) => {
    setCurrentSelectedFilters(filters);
  };

  return useMemo(() => {
    const filters = currentSelectedFilters || [];

    const selection = [];

    for (const option of group.options) {
      if (filters.includes(option.code)) {
        selection.push(option);
      }
    }

    let Controls = ControlsComponent || CheckboxFilterGroup;

    let caption = null;

    if (selection.length === 1) {
      caption = selection[0].name;
    } else if (selection.length > 0) {
      caption = `${selection.length} selected`;
    }

    if (isSimpleList) {
      return (
        <ListItem {...listItemProps}>
          <span className={classes.groupTitle}>{group.name}</span>
          <Controls
            group={group}
            submitOnChange={submitOnChange}
            selectedFilters={currentSelectedFilters}
            onSelectedFiltersChange={handleSelectedFiltersChange}
            {...controlsProps}
          />
        </ListItem>
      );
    }

    return (
      <StyledExpandableSection
        title={group.name}
        caption={caption}
        defaultExpanded={defaultExpanded}
        classes={{ title: classes.groupTitle }}
      >
        <Controls
          group={group}
          submitOnChange={submitOnChange}
          selectedFilters={currentSelectedFilters}
          onSelectedFiltersChange={handleSelectedFiltersChange}
          {...controlsProps}
        />
      </StyledExpandableSection>
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
    currentSelectedFilters,
    classes,
  ]);
}

FacetGroup.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        matches: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
     
      })
    ),
  }),
  submitOnChange: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  ControlsComponent: PropTypes.elementType,
  controlsProps: PropTypes.object,
  listItemProps: PropTypes.object,
  isSimpleList: PropTypes.bool,
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
  onSelectedFiltersChange: PropTypes.func,
};
