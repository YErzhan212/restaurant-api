import * as types from './types';

export function getRestaurant(data) {
   return { type: types.GET_RESTAURANT, data }
}

export function addRestaurant(data) {
   return { type: types.ADD_RESTAURANT, data }
}

export function editRestaurant(data) {
   return { type: types.EDIT_RESTAURANT, data }
}

export function deleteRestaurant(data) {
   return { type: types.DELETE_RESTAURANT, data }
}
