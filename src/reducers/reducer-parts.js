import { combineReducers } from 'redux';

function editPartProperty(state={}, action) {
  
  
}

function partsById(state={}, action) {
  switch (action.payload) {
    case EDIT_CELL: return editPartProperty(state, action);
    default: return state;
  }    
}
  

function allIds(state={}, action) {
  
}

function partsReducer = combineReducers({
  byId: partsById,
  allIds: allParts,
})
