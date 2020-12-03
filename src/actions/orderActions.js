import * as types from './types';

export function getOrder() {
   return { type: types.GET_ORDER }
}

export function addOrder(data) {
   return { type: types.ADD_ORDER, data }
}