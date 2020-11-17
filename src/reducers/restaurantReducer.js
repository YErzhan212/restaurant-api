import * as types from '../actions/types';

const initialState = {
   isLoading: false,
   restaurants: {},
   restaurantResponse: "",
}

export default function restaurantReducer(state = initialState, action) {
   switch(action.type){
      case types.GET_RESTAURANT:
         return {...state, isLoading: true}
      case types.RESTAURANT_RECEIVED:
         return {...state, isLoading: false, restaurants: action.payload};
      case types.RESTAURANT_FAILED:
         return {...state, isLoading: false, error: action.error}
      case types.ADD_RESTAURANT:
         return {...state, isLoading: true, error: action.error}
      case types.ADD_RESTAURANT_RECEIVED:
         return {...state, isLoading: false, restaurantResponse: action.payload} 
      case types.ADD_RESTAURANT_FAILED:
         return {...state, isLoading: false, error: action.error}
      case types.EDIT_RESTAURANT:
         return {...state, isLoading: true}
      case types.EDIT_RESTAURANT_RECEIVED:
         return {...state, isLoading: false, restaurantResponse: action.payload}  
      case types.EDIT_RESTAURANT_FAILED:
         return {...state, isLoading: false, error: action.error}       
      case types.DELETE_RESTAURANT:
         return {...state, isLoading: true, restaurantResponse: action.payload, error: action.error}
      case types.DELETE_RESTAURANT_SUCCESS:
         return {...state, isLoading: false, error: action.error}   
      default:
         return state;   
   }
}            