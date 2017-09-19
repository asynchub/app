import {
  FIND_PARTS_FROM_FILES, // to be modified
  FETCH_PARTS_FROM_DB,
  WRITE_PARTS_TO_DB,
  EDIT_CELL
} from '../actions/index';

export default function productParts(state={}, action) {
  console.log(action.type);
  switch (action.type) {
    case EDIT_CELL:
      console.log("cell value after edit:", action.payload);
      return action.payload;
    case FETCH_PARTS_FROM_DB:
      console.log("from reducer:", action.payload);
      return action.payload;
    default:
      return state;
  }
}
