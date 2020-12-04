import { all, put, takeLatest } from '@redux-saga/core/effects';
import * as types from '../actions/types';
import axios from 'axios';

function* getFavorites() {
   try {
     const favoriteResponse = yield axios.get(`http://localhost:5000/api/favorite`).then(res => res.data)
     yield put({ type: types.GET_FAVORITES_SUCCESS, payload: favoriteResponse })
   } catch(error) {
      yield put({ type: types.GET_FAVORITES_FAILED, error })
   }
}

export function* favoriteSaga() {
   yield all([
      yield takeLatest(types.GET_FAVORITES, getFavorites)
   ])
}