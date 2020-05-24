const postActionTypes = {
    NEW_POST_START: 'NEW_POST_START',
    NEW_POST_SUCCESS: 'NEW_POST_SUCCESS',  // RELOAD
    NEW_POST_FAILURE: 'NEW_POST_FAILURE',

    DELETE_POST_START: 'DELETE_POST_START',
    DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS', // RELOAD
    DELETE_POST_FAILURE: 'DELETE_POST_FAILURE',

    UPDATE_MEMO_START: 'UPDATE_MEMO_START',
    UPDATE_MEMO_SUCCESS: 'UPDATE_MEMO_SUCCESS',   
    UPDATE_MEMO_FAILURE: 'UPDATE_MEMO_FAILURE',

    UPDATE_TAG_START: 'UPDATE_TAG_START',
    UPDATE_TAG_SUCCESS: 'UPDATE_TAG_SUCCESS',
    UPDATE_TAG_FAILURE: 'UPDATE_TAG_FAILURE',

    UPDATE_SHARE_START: 'UPDATE_SHARE_START',
    UPDATE_SHARE_SUCCESS: 'UPDATE_SHARE_SUCCESS',
    UPDATE_SHARE_FAILURE: 'UPDATE_SHARE_FAILURE',

    UPDATE_STATUS_START: 'UPDATE_STATUS_START',
    UPDATE_STATUS_SUCCESS: 'UPDATE_STATUS_SUCCESS',
    UPDATE_STATUS_FAILURE: 'UPDATE_STATUS_FAILURE',
    
    FETCH_OG_START: 'FETCH_OG_START',
    FETCH_OG_SUCCESS: 'FETCH_OG_SUCCESS',
    FETCH_OG_FAILURE: 'FETCH_OG_FAILURE',
    DELETE_OG : 'DELETE_OG'

};

export default postActionTypes;