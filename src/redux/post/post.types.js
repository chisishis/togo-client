const postActionTypes = {
    NEW_POST_START: 'NEW_POST_START',
    NEW_POST_SUCCES: 'NEW_POST_SUCCESS',  // RELOAD
    NEW_POST_FAILURE: 'NEW_POST_FAILURE',

    DELETE_POST_START: 'DELETE_POST_START',
    DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS', // RELOAD
    DELETE_POST_FAILURE: 'DELETE_POST_FAILURE',

    EDIT_MEMO_START: 'EDIT_MEMO_START',
    EDIT_MEMO_SUCCESS: 'EDIT_MEMO_SUCCESS',   
    EDIT_MEMO_FAILURE: 'EDIT_MEMO_FAILURE',

    EDIT_TAG_START: 'EDIT_TAG_START',
    EDIT_TAG_SUCCESS: 'EDIT_TAG_SUCCESS',
    EDIT_TAG_FAILURE: 'EDIT_TAG_FAILURE',

    EDIT_SHARE_START: 'EDIT_SHARE_START',
    EDIT_SHARE_SUCCESS: 'EDIT_SHARE_SUCCESS',
    EDIT_SHARE_FAILURE: 'EDIT_SHARE_FAILURE',

    EDIT_STATUS_START: 'EDIT_STATUS_START',
    EDIT_STATUS_SUCCESS: 'EDIT_STATUS_SUCCESS',
    EDIT_STATUS_FAILURE: 'EDIT_STATUS_FAILURE',
    
};

export default postActionTypes;