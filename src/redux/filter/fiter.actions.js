import filterActionTypes from './filter.types';


export const setFilter = filter => ({
    type: filterActionTypes.SET_FILTER,
    payload: filter 
})

