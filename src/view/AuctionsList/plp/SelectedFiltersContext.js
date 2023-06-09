import React, { createContext, useState } from 'react';

// Create a new context
export const SelectedFiltersContext = createContext();

// Create a context provider component
export function SelectedFiltersProvider({ children }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  return (
    <SelectedFiltersContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </SelectedFiltersContext.Provider>
  );
}
