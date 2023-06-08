import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import FacetGroup from './FacetGroup';
import FilterHeader from './FilterHeader';
import FilterFooter from './FilterFooter';

const PREFIX = 'RSFFilter';

const defaultClasses = {
  root: `${PREFIX}-root`,
  facetGroups: `${PREFIX}-facetGroups`,
};

const Root = styled('div')(({ theme }) => ({
  /**
   * Styles applied to the root element.
   */
  [`&.${defaultClasses.root}`]: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  /**
   * Styles applied to the wrapper element around the facet groups.
   */
  [`& .${defaultClasses.facetGroups}`]: {
    overflow: 'auto',
    overflowX: 'hidden',
    flex: '1',
    position: 'relative',
  },
}));

/**
 * UI for filtering a list of products. This component can be used on its own, or you can use
 * [`FilterButton`](/apiReference/plp/FilterButton) to automatically display this component in a
 * drawer that slides up from the bottom of the viewport.
 */
const Filter = function ({
  expandAll,
  hideClearLink,
  clearLinkText,
  submitOnChange,
  style,
  classes: c = {},
  title,
  onViewResultsClick,
}) {
  const classes = { ...defaultClasses, ...c };

  // Hardcoded facets data for testing purposes
  const facets = [
    {
      id: 1,
      name: 'Category',
      options: [
        { name: 'Cars', code: 'category:cars' },
        { name: 'Buses', code: 'category:buses' },
        { name: 'Tractors', code: 'category:tractors' },
      ],
    },
    {
      id: 2,
      name: 'Color',
      options: [
        { name: 'Red', code: 'color:red' },
        { name: 'Green', code: 'color:md' },
        { name: 'Blue', code: 'color:blue' },
        { name: 'White', code: 'color:white' },
        { name: 'Black', code: 'color:black' },
      ],
    },
    {
      id: 3,
      name: 'Make',
      options: [
        { name: 'Toyota', code: 'make:toyota' },
        { name: 'BMW', code: 'make:bmw' },
        { name: 'Volkswagen', code: 'make:volkswagen' },
        { name: 'Audi', code: 'make:audi' },
        { name: 'Mercedez', code: 'make:mercedez' },
      ],
    },
    {
      id: 4,
      name: 'Model',
      options: [
        { name: 'Probox', code: 'model:probox' },
        { name: 'Fielder', code: 'model:fielder' },
        { name: 'Noah', code: 'model:noah' },
        { name: 'Auris', code: 'model:auris' },
        { name: 'S7', code: 'model:s7' },
      ],
    },
    {
      id:5,
      name: 'Year',
      options: [
        { name: '2012', code: 'year:2012' },
        { name: '2013', code: 'year:2013' },
        { name: '2014', code: 'year:2014' },
        { name: '2015', code: 'year:2015' },
        { name: '2016', code: 'year:2016' },
      ],
    },
    {
      id: 6,
      name: 'Type',
      options: [
        { name: 'SUV', code: 'type:2012' },
        { name: 'Sedan', code: 'type:2013' },
        { name: 'Hatchback', code: 'type:2014' },
        { name: 'Wagon', code: 'type:2015' },
      ],
    },
    {
      id: 7,
      name: 'Availability',
      options: [
        { name: 'Local', code: 'availability:local' },
        { name: 'International', code: 'availability:international' },
      ],
    },
    // Add more facet groups as needed
  ];

  return (
    <Root style={style} className={classes.root}>
      <FilterHeader
        hideClearLink={hideClearLink}
        clearLinkText={clearLinkText}
        title={title}
        submitOnChange={submitOnChange}
      />
      <div className={classes.facetGroups}>
        {facets &&
          facets.map((group, i) => (
            <FacetGroup
              group={group}
              key={i}
              defaultExpanded={expandAll}
              submitOnChange={submitOnChange}
            />
          ))}
      </div>
      <FilterFooter onViewResultsClick={onViewResultsClick} submitOnChange={submitOnChange} />
    </Root>
  );
};

Filter.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * A function to call when the user clicks the button to view updated results. The default behavior can be
   * canceled by calling `preventDefault` on the passed in event. The event is passed as the only argument.
   */
  onViewResultsClick: PropTypes.func,

  /**
   * The query string parameter that should be updated when filters are changed. The value will be an array
   * of codes for each selected facet.
   */
  queryParam: PropTypes.string,

  /**
   * An optional title to display at the top of the component.
   */
  title: PropTypes.string,

  /**
   * Set to `true` to expand all groups on initial render.
   */
  expandAll: PropTypes.bool,

  /**
   * Set to `true` to refresh the results when the user toggles a filter.
   */
  submitOnChange: PropTypes.bool,

  /**
   * If `true`, the clear link is hidden.
   */
  hideClearLink: PropTypes.bool,

  /**
   * Text to use for the clear link.
   */
  clearLinkText: PropTypes.string,

  /**
   * CSS styles to add to the root component.
   */
  style: PropTypes.object,
};

Filter.defaultProps = {
  onViewResultsClick: Function.prototype,
  submitOnChange: false,
};

export default memo(Filter);
