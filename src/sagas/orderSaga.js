import { all, put, takeLatest } from '@redux-saga/core/effects';
import * as types from '../actions/types';
import axios from 'axios';

function* getOrder() {
   try {
      const orderResponse = yield axios.get(`http://localhost:5000/api/order`).then(res => res.data)
      yield put({ type: types.ORDER_SUCCESS, payload: orderResponse })
   } catch(error) {
      yield put({ type: types.ORDER_FAILED, error })
   }
}

function* addOrder(action) {

   const {data} = action

   try {
      const orderResponse = yield axios.post(`http://localhost:5000/api/order`, data).then(res => res.data)
      yield put({ type: types.ADD_ORDER_SUCCESS, payload: orderResponse })
      yield getOrder(data)
   } catch(error) {
      yield put({ type: types.ADD_ORDER_FAILED, error })
   }
}

export function* orderSaga() {
   yield all([
      yield takeLatest(types.GET_ORDER, getOrder),
      yield takeLatest(types.ADD_ORDER, addOrder)
   ])
}