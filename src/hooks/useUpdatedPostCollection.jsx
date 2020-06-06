import { useSelector, shallowEqual } from "react-redux";

/**
 * A hook retruns updated postCollection and index 
 *
 * 
 */
export const useUpdatedPostCollection = (postId, updatingKey, updatingValue) => {
  
    const posts = useSelector( state => state.posts.postCollection, shallowEqual)
    
    const index = posts.findIndex( post => post.id === postId)    
    
    let updatedPostCollection = [...posts];
    updatedPostCollection[index] = {...updatedPostCollection[index], [updatingKey]: updatingValue};   
   
    return {updatedPostCollection, index}

};
