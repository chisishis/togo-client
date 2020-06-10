import { useSelector, shallowEqual } from "react-redux";

/**
 * A hook retruns updated postCollection and index 
 * @param {string} postId 
 * @param {string} updatingKey   
 * @param {String} updatingValue
 * 
 * @returns {array} updatedPostCollection - a collections of posts with updated post 
 * @returns {number} index - index of array to be updated
 * 
 */
export const useUpdatedPostCollection = (postId, updatingKey, updatingValue) => {
  
    const posts = useSelector( state => state.posts.postCollection, shallowEqual)
    
    const index = posts.findIndex( post => post.id === postId)    
    
    let updatedPostCollection = [...posts];
    updatedPostCollection[index] = {...updatedPostCollection[index], [updatingKey]: updatingValue};   
   
    return {updatedPostCollection, index}

};
