import * as types from '../actions/types';

const initialState = {
   isLoading: false,
   reviews: [],
   reviewResponse: {}
}

export default function reviewReducer(state = initialState, action) {
   switch(action.type) {
      case types.GET_REVIEW:
         return {...state, isLoading: true}
      case types.REVIEW_RECEIVED:
         return {...state, isLoading: false, reviews: action.payload}
      case types.REVIEW_FAILED:
         return {...state, isLoading: false, error: action.error}
      case types.ADD_REVIEW:
         return {...state, isLoading: true}
      case types.ADD_REVIEW_RECEIVED:
         return {...state, isLoading: false, reviewResponse: action.payload}
      case types.ADD_REVIEW_FAILED:
         return {...state, isLoading: false, error: action.error}        
      default:
         return state         
   }
}