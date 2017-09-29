import { combineReducers } from 'redux';

import {
  FETCH_MATERIALS_FROM_DB, // to hydrate all the slices of this state, besides stockMaterials slices
  // to hydrate stockMaterial slices of this state with 
  // materials according to 3 material criterias in a row: grade, profile, size
  FETCH_STOCK_MATERIALS_FROM_DB, 
  
}




function gradesByGradeStd(state={}, action) {
  switch(action.type) {
    default: return state;
  }
}

function allGradesStds(state=[], action) {
  switch(action.type) {
    default: return state;
  }
}

function allGrades(state=[], action) {
  switch(action.type) {
    default: return state;
  }
}



function sizesByProfile(state={}, action) {
  switch(action.type) {
    default: return state;
  }
}

function allProfiles(state=[], action) {
  switch(action.type) {
    default: return state;
  }
}

function allSizes(state=[], action) {
  switch(action.type) {
    default: return state;
  }
}



function profilesByToleranceStds(state={}, action) {
  switch(action.type) {
    default: return state;
  }
}

function allToleranceStds(state=[], action) {
  switch(action.type) {
    default: return state;
  }
}



function surfaceStdsByProfiles(state={}, action) {
  switch(action.type) {
    default: return state;
  }
}

function allSurfaceStds(state=[], action) {
  switch(action.type) {
    default: return state;
  }
}



function surfaceClassesBySurfaceStds(state={}, action) {
  switch(action.type) {
    default: return state;
  }
}

function allSurfaceClasses(state=[], action) {
  switch(action.type) {
    default: return state;
  }
}



function stockMaterialsById(state={}, action) {
  const { payload } = action;
  switch(action.type) {
    case: FETCH_STOCK_MATERIALS_FROM_DB: return payload.stockMaterialsById;
    default: return state;
  }
}

function stockMaterialsAllIds(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case: FETCH_STOCK_MATERIALS_FROM_DB: return payload.stockMaterialsAllIds;
    default: return state;
  }
}




const materialsReducer = combineReducers({
  gradesByGradeStd, // grades grouped into standards accordingly
  allGradesStds, // array of all grade standards
  allGrades, // collection of all grades from gradesByGradeStds
  
  sizesByProfile, // sizes grouped into profiles accordingly
  allProfiles, // array of all profiles
  allSizes, // collection of all sizes from sizesByProfile
  
  profilesByToleranceStds, // profiles grouped by tolerance standards
  allToleranceStds, // array of all tolerance standards

  surfaceStdsByProfiles, // surface standards grouped by profiles
  allSurfaceStds, // array of all surface standards
  
  surfaceClassesBySurfaceStds, // surface classes grouped by surface standards
  allSurfaceClasses, // array of all surface classes
  
  stockMaterialsById, // object of stock materials, fetched according some or all criterias above in row of cell being edited
  stockMaterialsAllIds, // array of all stock materials, fetched according some or all criterias above in row of cell being edited
});

export default materialsReducer;
