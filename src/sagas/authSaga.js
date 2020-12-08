import { all, put, takeLatest } from '@redux-saga/core/effects';
import * as types from '../actions/types';
import axios from 'axios';
import setAuthToken from '../utills/setAuthToken';
import jwt_decode from 'jwt-decode';

function* signUp(action) {
   
   const {data, history} = action;

   try{
      const authResponse = yield axios.post(`http://localhost:5000/api/users/register`, data).then(res => res.data)
      yield put({ type: types.SIGN_UP_SUCCESS, payload: authResponse });
      history.push('/');
   } catch(error) {
      yield put ({ type: types.SIGN_UP_FAILED, error })
   }
}

function* signIn(action) {

   const {data, history} = action;

   try{
      const authResponse = yield axios.post(`http://localhost:5000/api/users/login`, data).then(res => res.data)
      const {token, role} = authResponse;
      setAuthToken(token)
      localStorage.setItem('token', token)
      const decoded = jwt_decode(token)
      yield put({ type: types.SET_CURRENT_USER, payload: decoded });
      
         if (role === 'admin') {
            history.push('/profile')
         } else { 
            history.push('/') 
         }

   } catch(error) {
      yield put({ type: types.SIGN_IN_FAILED, error })
   }
}

function* logOut(action) {

   const { history } = action;

   try {
      localStorage.removeItem('token');
      yield put({ type: types.SET_CURRENT_USER, payload: {} });
      setAuthToken(false);
      history.push('/signin');
   } catch(error) {
      yield put({ type: types.LOGOUT_FAILED, error })
   }

}

export function* authSaga() {
   yield all ([
      yield takeLatest(types.SIGN_UP, signUp),
      yield takeLatest(types.SIGN_IN, signIn),
      yield takeLatest(types.LOGOUT, logOut),
   ])
}