import {useState, useEffect} from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { updatePostStart } from "../../redux/posts/posts.actions";

/**
 * A hook retruns updated postCollection and index 
 * @param {string} postId 
 * @param {string} updatingKey   
 * @param {String} updatingValue
 * 
 * @returns {array} getUpdatedPostCollection - a collections of posts with updated post 
 * @returns {number} getIndex - index of array to be updated
 * 
 */
export const usePost = (post) => {
  

    // items that cannot be changed
    const id = post.id;
    const authorId = post.authorId;
    const link = post.link;

    // items that can be changed
    const [statusDates, setStatusDates] = useState(post.statusDates);
    const [memo, setMemo] = useState(post.memo);
    const [tags, setTags] = useState(post.tags);
    const [shareWith, setShareWith] = useState(post.shareWith);
    
    const post = {
        id,
        authorId,
        link,
        statusDates,
        memo,
        tags,
        shareWith
    }

    return {
        post,
        getArrayIndex, 
        getUpdatedPostCollection
    }
    

};
