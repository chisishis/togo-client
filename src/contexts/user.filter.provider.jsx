import React, { createContext, useState, useEffect, useContext} from 'react';

const FilterContext = createContext();


export const FilterProvider = ({ children }) => {
    const filter = useFilterProvider();
    return <FilterContext.Provider value={filter}> {children} </FilterContext.Provider>
}

export const useFilter = () => {
    return useContext(FilterContext);
}


const useFilterProvider = () => {
    const [filter, setFilter] = useState({
        all: true,
        created: true,
        planned: true,
        postponed: true,
        cancelled: true,
        completed: true,
    })

    const isChanged = false;

    return {isChanged, filter, setFilter}
}
