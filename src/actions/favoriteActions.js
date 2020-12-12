import * as types from './types';

export function getFavorites() {
   return { type: types.GET_FAVORITES }
}

export function addFavorites(data) {
   return { type: types.ADD_FAVORITES, data }
}