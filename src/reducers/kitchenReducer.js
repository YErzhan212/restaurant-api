import * as types from '../actions/types';

const initialState = {
   isLoading: false,
   kitchens: [],
   kitchenResponse: {}
}

export default function kitchenReducer(state = initialState, action) {
   switch(action.type){
      case types.GET_KITCHENS:
         return {...state, isLoading: true};
      case types.KITCHENS_RECEIVED:
         return {...state, isLoading: false, kitchens: action.payload} ;
      case types.KITCHENS_FAILED:
         return {...state, isLoading: false, error: action.error}; 
      case types.CREATE_KITCHENS:
         return {...state, isLoading: true};
      case types.CREATE_KITCHENS_SUCCESS:
         return {...state, isLoading: false, kitchenResponse: action.payload };
      case types.CREATE_KITCHENS_FAILED:
         return {...state, isLoading: false, error: action.error};
      case types.EDIT_KITCHEN:
         return {...state, isLoading: true};
      case types.EDIT_KITCHEN_SUCCESS:
         return {...state, isLoading: false, kitchenResponse: action.payload}
      case types.EDIT_KITCHEN_FAILED:
         return {...state, isLoading: false, error: action.error}
      case types.KITCHEN_DELETE:
         return {...state, isLoading: true};
      case types.KITCHEN_DELETE_SUCCESS:
         return {...state, isLoading: false, kitchenResponse: action.payload}   
      case types.KITCHEN_DELETE_FAILED:
         return {...state, isLoading: false, error: action.error}         
      default:
         return state;       
   }
}
