import filterActionTypes from "./filter.types";

const INITIAL_STATE = {    
    all: true,
    created: true,
    planned: true,
    completed: true,
    postponed: true,
    cancelled: true,  
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case filterActionTypes.SET_FILTER:  
      return action.payload;
    default:      
      return { ...state };
  }
};

export default filterReducer;
