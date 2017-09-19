import { combineReducers } from 'redux';
import { 
  EDIT_CELL,
  ADD_PART
} from '../actions/index';

function editPartProperty(state={}, action) {
  const { payload } = action;
  const { partId, partProperty, propertyValue } = payload;
  const part = { ...state[partId], partProperty: propertyValue };
  return { ...state, partId: part };
}

function addPart(state={}, action) {
  
}

function partsById(state={}, action) {
  switch (action.payload) {
    case EDIT_CELL: return editPartProperty(state, action);
    case ADD_PART: return addPart(state, action);
    default: return state;
  }    
}


function allIds(state={}, action) {
  
}

export default function partsReducer = combineReducers({
  byId: partsById,
  allIds: allParts,
})
