import React, { memo, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import FacetGroup from './FacetGroup';
import FilterHeader from './FilterHeader';
import FilterFooter from './FilterFooter';
import axios from 'axios';

import { useQuery } from "react-query";
import { loadCategories } from '../../../data/api/api';
import { loadMakes } from '../../../data/api/api';
import { loadModels } from '../../../data/api/api';

import { SelectedFiltersProvider } from './SelectedFiltersContext';
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
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSelectedFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };


  const [auctionChoices, setAuctionChoices] = useState(null);

  const { data: categoriesData = { results: [] } } = useQuery('categories', loadCategories);
  const categories = categoriesData.results;

  const { data: makesData = { results: [] } } = useQuery('makes', loadMakes);
  const makes = makesData.results;

  const { data: modelsData = { results: [] } } = useQuery('models', loadModels);
  const models = modelsData.results;

  useEffect(() => {
    const fetchAuctionChoices = async () => {
      try {
        const response = await axios.get("http://192.168.43.38:8000/trader/api/auction-choices/");
        setAuctionChoices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuctionChoices();
  }, []);

  const facets = [
    {
      id: 1,
      name: 'Category',
      options: categories.map((category) => ({
        name: category.name,
        code: `category:${category.id}`,
        matches: 20,
      })),
    },
    {
      id: 2,
      name: 'Color',
      options: [
        { name: 'Red', code: 'color:red', matches: 20 },
        { name: 'Green', code: 'color:md', matches: 20 },
        { name: 'Blue', code: 'color:blue', matches: 20 },
        { name: 'White', code: 'color:white', matches: 20 },
        { name: 'Black', code: 'color:black', matches: 20 },
      ],
    },
    {
      id: 3,
      name: 'Make',
      options: makes.map((make) => ({
        name: make.name,
        code: `make:${make.id}`,
        matches: 20,
      })),
    },
    {
      id: 4,
      name: 'Model',
      options: models.map((model) => ({
        name: model.name,
        code: `model:${model.id}`,
        matches: 20,
      })),
    },
    {
      id: 5,
      name: 'Year',
      options: auctionChoices?.supported_years.map(([value, label]) => ({
        name: label,
        code: `value:${value}`,
        matches: 20,
      })) || [],
    },
    {
      id: 6,
      name: 'Type',
      options: auctionChoices?.supported_types.map(([value, label]) => ({
        name: label,
        code: `value:${value}`,
        matches: 20,
      })) || [],
    },
    {
      id: 7,
      name: 'Availability',
      options: [
        { name: 'Local', code: 'availability:local', matches: 20 },
        { name: 'International', code: 'availability:international', matches: 20 },
      ],
    },
    // Add more facet groups as needed
  ];

  return (
    <SelectedFiltersProvider value={selectedFilters}>
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
            selectedFilters={selectedFilters}
            onSelectedFiltersChange={handleSelectedFiltersChange}
          />
          ))}
      </div>
      <FilterFooter onViewResultsClick={onViewResultsClick} submitOnChange={submitOnChange} />
    </Root>
    </SelectedFiltersProvider> 
  );
};

Filter.propTypes = {
  classes: PropTypes.object,
  onViewResultsClick: PropTypes.func,
  title: PropTypes.string,
  expandAll: PropTypes.bool,
  submitOnChange: PropTypes.bool,
  hideClearLink: PropTypes.bool,
  clearLinkText: PropTypes.string,
  style: PropTypes.object,
};

Filter.defaultProps = {
  onViewResultsClick: Function.prototype,
  submitOnChange: false,
};

export default memo(Filter);
