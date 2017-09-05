import { READ_SOURCE_FILE_TREE } from '../actions/index';

export default function TableData(state={}, action) {
  switch (action.type) {
    case READ_SOURCE_FILE_TREE:
      return action.payload;
  }
  return state;
}  
