import { all, put, takeLatest } from '@redux-saga/core/effects';
import * as types from '../actions/types';
import axios from 'axios';

function* getRestaurant(action) {

   const {data} = action

   if (data) {
      try {
         const restaurantResponse = yield axios.get(`http://localhost:5000/api/restaurant?query=${data.query}&page=${data.page}`).then(res => res.data)
         yield put({ type: types.RESTAURANT_RECEIVED, payload: restaurantResponse })
      } catch(error) {
         yield put({ type: types.RESTAURANT_FAILED, error })
      }
   } else {
      try {
         const restaurantResponse = yield axios.get(`http://localhost:5000/api/restaurant?query=&page=`).then(res => res.data)
         yield put({ type: types.RESTAURANT_RECEIVED, payload: restaurantResponse })
      } catch(error) {
         yield put({ type: types.RESTAURANT_FAILED, error })
      }
   }
}

function* addRestaurant(action) {

   const {data} = action;
   console.log(data)

   const fm = new FormData();
   fm.append('name', data.name);
   fm.append('location', data.location);
   fm.append('image', data.image);
   fm.append('kitchens', JSON.stringify(data.kitchens));
   fm.append('averageBill', data.averageBill)
   fm.append('amountOfPlace', data.amountOfPlace)
   fm.append('phone', data.phone)
   fm.append('rate', data.rate)
   try {
       const restaurantResponse = yield axios.post("http://localhost:5000/api/restaurant", fm).then(res => res.data);
       yield put({type: types.ADD_RESTAURANT_RECEIVED, payload: restaurantResponse});
       yield getRestaurant({data: {query: ``, page: 1}});

   } catch(error) {
       yield put({type:types.ADD_RESTAURANT_FAILED, error})
   }
}

function* editRestaurant(action) {

   const {data} = action;

   const fm = new FormData();
   fm.append('name', data.name);
   fm.append('location', data.location);
   fm.append('image', data.image);
   fm.append('kitchens', JSON.stringify(data.kitchens));
   fm.append('averageBill', data.averageBill)
   fm.append('amountOfPlace', data.amountOfPlace)
   fm.append('phone', data.phone)
   fm.append('rate', data.rate)

   try {
      const restaurantResponse = yield axios.put(`http://localhost:5000/api/restaurant`, fm).then(res => res.data)
      yield put({ type: types.EDIT_RESTAURANT_RECEIVED, payload: restaurantResponse })
      yield getRestaurant({ data: {query: ``, page: 1} })
   } catch(error) {
      yield put({ type: types.EDIT_RESTAURANT_FAILED, error })
   }
}

function* deleteRestaurant(action) {

   const {data} = action

   try {
      const restaurantResponse = yield axios.delete(`http://localhost:5000/api/restaurant/${data}`).then(res => res.data)
      yield put ({ type: types.DELETE_RESTAURANT_SUCCESS, payload: restaurantResponse });
      yield getRestaurant({ data: {query: '', page: 1} });
   } catch(error) {
      yield put({ type: types.RESTAURANT_FAILED, error })
   }
}

export function* restaurantSaga() {
   yield all ([
      yield takeLatest(types.GET_RESTAURANT, getRestaurant),
      yield takeLatest(types.ADD_RESTAURANT, addRestaurant),
      yield takeLatest(types.EDIT_RESTAURANT, editRestaurant),
      yield takeLatest(types.DELETE_RESTAURANT, deleteRestaurant)
   ])
}