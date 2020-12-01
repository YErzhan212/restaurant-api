import * as types from '../actions/types';

const initialState = {
   isLoading: false,
   orders: [],
   orderResponse: {}
}

export default function orderReducer(state = initialState, action) {
   switch(action.type) {
      case types.GET_ORDER:
         return {...state, isLoading: true}
      case types.ORDER_SUCCESS:
         return {...state, isLoading: false, orders: action.payload}
      case types.ORDER_FAILED:
         return {...state, isLoading: false, error: action.error}
      case types.ADD_ORDER:
         return {...state, isLoading: true}
      case types.ADD_ORDER_SUCCESS:
         return {...state, isLoading: false, orderResponse: action.payload}
      case types.ADD_ORDER_FAILED:
         return {...state, isLoading: false, error: action.error}         
      default:
         return state         
   }
} 