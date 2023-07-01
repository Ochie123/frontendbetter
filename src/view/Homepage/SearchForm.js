import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [categoryAggs, setCategoryAggs] = useState([]);
  const [makeAggs, setMakeAggs] = useState([]);
  const [modelAggs, setModelAggs] = useState([]);
  const [typeAggs, setTypeAggs] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      console.log('Search Term:', searchTerm);
      console.log('Category:', category);
      console.log('Make:', make);
      console.log('Model:', model);
      console.log('Type:', type);
  
      const response = await axios.post('http://localhost:9200/tradekin/_search', {
        query: {
          bool: {
            must: [
              { match: { _all: searchTerm } },
              { match: { category } },
              { match: { make } },
              { match: { model } },
              { match: { type } }
            ]
          }
        },
        aggs: {
          categories: {
            terms: {
              field: 'category',
              size: 10
            }
          },
          makes: {
            terms: {
              field: 'make',
              size: 10
            }
          },
          models: {
            terms: {
              field: 'model',
              size: 10
            }
          },
          types: {
            terms: {
              field: 'type',
              size: 10
            }
          }
        }
      });
  
      console.log(response.data); // Log the response for debugging
  
      setResults(response.data.hits.hits);
      setCategoryAggs(response.data.aggregations.categories.buckets);
      setMakeAggs(response.data.aggregations.makes.buckets);
      setModelAggs(response.data.aggregations.models.buckets);
      setTypeAggs(response.data.aggregations.types.buckets);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryFilter = (categoryName) => {
    setCategory(categoryName);
  };

  const handleMakeFilter = (makeName) => {
    setMake(makeName);
  };

  const handleModelFilter = (modelName) => {
    setModel(modelName);
  };

  const handleTypeFilter = (typeName) => {
    setType(typeName);
  };

  const handleRemoveCategoryFilter = () => {
    setCategory('');
  };

  const handleRemoveMakeFilter = () => {
    setMake('');
  };

  const handleRemoveModelFilter = () => {
    setModel('');
  };

  const handleRemoveTypeFilter = () => {
    setType('');
  };

  useEffect(() => {
    handleSearch();
  }, [category, make, model, type]); // Trigger search when category, make, model, or type changes

  return (
    <div>
      <h2>Search</h2>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {categoryAggs.length > 0 && (
        <div>
          <h2>Categories</h2>
          <ul>
            {categoryAggs.map((agg) => (
              <li key={agg.key}>
                <a href="#" onClick={() => handleCategoryFilter(agg.key)}>
                  {agg.key}
                </a>{' '}
                ({agg.doc_count})
              </li>
            ))}
          </ul>
          {category && (
            <a href="#" onClick={handleRemoveCategoryFilter}>
              Remove Category Filter
            </a>
          )}
        </div>
      )}

      {makeAggs.length > 0 && (
        <div>
          <h2>Makes</h2>
          <ul>
            {makeAggs.map((agg) => (
              <li key={agg.key}>
                <a href="#" onClick={() => handleMakeFilter(agg.key)}>
                  {agg.key}
                </a>{' '}
                ({agg.doc_count})
              </li>
            ))}
          </ul>
          {make && (
            <a href="#" onClick={handleRemoveMakeFilter}>
              Remove Make Filter
            </a>
          )}
        </div>
      )}

      {modelAggs.length > 0 && (
        <div>
          <h2>Models</h2>
          <ul>
            {modelAggs.map((agg) => (
              <li key={agg.key}>
                <a href="#" onClick={() => handleModelFilter(agg.key)}>
                  {agg.key}
                </a>{' '}
                ({agg.doc_count})
              </li>
            ))}
          </ul>
          {model && (
            <a href="#" onClick={handleRemoveModelFilter}>
              Remove Model Filter
            </a>
          )}
        </div>
      )}

      {typeAggs.length > 0 && (
        <div>
          <h2>Types</h2>
          <ul>
            {typeAggs.map((agg) => (
              <li key={agg.key}>
                <a href="#" onClick={() => handleTypeFilter(agg.key)}>
                  {agg.key}
                </a>{' '}
                ({agg.doc_count})
              </li>
            ))}
          </ul>
          {type && (
            <a href="#" onClick={handleRemoveTypeFilter}>
              Remove Type Filter
            </a>
          )}
        </div>
      )}

      <h2>Results</h2>
      <ul>
        {results.length > 0 ? (
          results.map((result) => (
            <li key={result._id}>
              Name: <b>{result._source.name}</b> <br />
              <i>Category: {result._source.category}</i> <br />
              <i>Price: {result._source.reserveprice}</i> <br />
              {/* Add additional attributes here */}
              <i>Start Time: {result._source.start_time}</i> <br />
              <i>Duration: {result._source.duration}</i> <br />
              <i>Car Specification: {result._source.car_specification}</i> <br />
              <i>Make: {result._source.make}</i> <br />
              <i>Model: {result._source.model}</i> <br />
              <i>Type: {result._source.type}</i> <br />
            </li>
          ))
        ) : (
          <li>No results found. Please try another search term.</li>
        )}
      </ul>
    </div>
  );
};

export default SearchForm;