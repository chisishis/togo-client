import { takeLatest, put, all, call } from "redux-saga/effects";

import postActionTypes from './post.types';

import {
    newPostSuccess,
    newPostFailure,
    fetchOgSuccess,
    fetchOgFailure,    
}
from './post.actions'

import {
    fetchOg
} 
from '../../util'


import  { firestore } from '../../util/firebase';

export function* postStart ({payload: { post, shareWith, tags, statusDates, link}}) {
    try{

        const docRef = yield firestore.collection.doc();
        yield docRef.set({post, shareWith, tags, statusDates, link})

        yield put(newPostSuccess())

    } catch (error) {
        yield put(newPostFailure(error.code));
    }    
}

export function* fetchOgDataStart ({payload: url}) {
    try {
        const fetchedData = yield fetchOg(url);
        
        if (Boolean(fetchedData.error)) {
            put(fetchOgFailure(fetchedData.error))
        } else {
            put(fetchOgSuccess(fetchedData))
        }


    } catch (error) {
        yield put(fetchOgFailure(error.code))
    }
}