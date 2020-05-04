import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const post = useFilterProvider();
  return (
    <FilterContext.Provider value={post}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  return useContext(FilterContext);
};

const useFilterProvider = () => {
  const [filter, setFilter] = useState({
    all: true,
    created: true,
    planned: true,
    postponed: true,
    cancelled: true,
    completed: true,
  });

  return {
    filter,
    setFilter,
  };
};
