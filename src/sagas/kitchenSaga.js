import { all, put, takeLatest } from '@redux-saga/core/effects';
import * as types from '../actions/types';
import axios from 'axios';

function* getKitchens() {
   try{
      const kitchenResponse = yield axios.get(`http://localhost:5000/api/kitchen`).then(res => res.data)
      yield put({ type: types.KITCHENS_RECEIVED, payload: kitchenResponse });
   } catch(error) {
      yield put ({ type: types.KITCHENS_FAILED, error })
   }
}

function* postKitchens(action) {

   const {data} = action;

   try{
      const kitchenResponse = yield axios.post(`http://localhost:5000/api/kitchen`, data).then(res => res.data)
      yield put({ type: types.CREATE_KITCHENS_SUCCESS, payload: kitchenResponse });
      yield getKitchens();
   } catch(error) {
      yield put ({ type: types.CREATE_KITCHENS_FAILED, error });
   }
}

function* editKitchens(action) {

   const {data} = action;

   try{
      const kitchenResponse = yield axios.put(`http://localhost:5000/api/kitchen/${data.id}`, {name: data.name}).then(res => res.data)
      yield put({ type: types.EDIT_KITCHEN_SUCCESS, payload: kitchenResponse });
      yield getKitchens();
   } catch(error) {
      yield put ({ type: types.EDIT_KITCHEN_FAILED, error });
   }
}

function* deleteKitchen(action) {

   const {data} = action;

   try{
      const kitchenResponse = yield axios.delete(`http://localhost:5000/api/kitchen/${data}`).then(res => res.data)
      yield put({ type: types.KITCHEN_DELETE_SUCCESS, payload: kitchenResponse });
      yield getKitchens();
   } catch(error) {
      yield put ({ type: types.KITCHEN_DELETE_FAILED, error });
   }
}

export function* kitchenSaga() {
   yield all ([
      yield takeLatest(types.GET_KITCHENS, getKitchens),
      yield takeLatest(types.CREATE_KITCHENS, postKitchens),
      yield takeLatest(types.EDIT_KITCHEN, editKitchens),
      yield takeLatest(types.KITCHEN_DELETE, deleteKitchen)
   ])
}