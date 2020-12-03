import * as types from './types';

export function getKitchens() {
   return { type: types.GET_KITCHENS }
}

export function postKitchens(data) {
   return { type: types.CREATE_KITCHENS, data }
}

export function editKitchens(data) {
   return { type: types.EDIT_KITCHEN, data }
}

export function deleteKitchen(data) {
   return { type: types.KITCHEN_DELETE, data }
}




