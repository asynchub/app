import {
  FETCH_MATERIALS_FROM_DB,
  FETCH_COMPL_FROM_DB,
  FETCH_PROFILES_FROM_DB
} from '../actions/index';

export default function productMaterials(state={}, action) {
  // develop to fetch just materials, that are used in details of chosen products
  // and when user wants more, he clicks ... button on drop-down menu of the part form
  switch (action.type) {
    case FETCH_MATERIALS_FROM_DB:
      return action.payload;
    default:
      return state;
  }
  return state;
}

// loads the material to state.material if it is chosen by users
// (called when user fills the detail form material input field)
// before user submits part to apply material)
/*
export default function addProductMaterial(state={}, action) {
  return action.payload;
}
*/
