import ActionButton from 'antd/lib/modal/ActionButton';
import * as types from '../actions/types';

const initialState = {
   isLoading: false,
   favorites: []
}

export default function favoriteReducer(state = initialState, action) {
   switch(action.type) {
      case types.GET_FAVORITES:
         return {...state, isLoading: true}
      case types.GET_FAVORITES_SUCCESS:
         return {...state, isLoading: false, favorites: action.payload}
      case types.GET_FAVORITES_FAILED:
         return {...state, isLoading: false, error: action.error}
      default:
         return state         
   }
}