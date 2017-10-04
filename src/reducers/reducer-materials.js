import { combineReducers } from 'redux';

import {
  FETCH_MATERIALS_FROM_DB, // to hydrate all the slices of this state, besides stockMaterials slices
  // to hydrate stockMaterial slices of this state with
  // materials according to 3 material criterias in a row: grade, profile, size
  FETCH_STOCK_MATERIALS_FROM_DB,
  FILTER_OPTIONS_BY_GRADE_STDS,
  FILTER_OPTIONS_BY_PROFILES,
  FILTER_OPTIONS_BY_TOLERANCE_STDS,
  FILTER_OPTIONS_BY_SURFACE_STDS,
  FILTER_STOCK_MATERIALS_BY
} from '../actions/index';

// this general helper function, called from object slice reducers on action FILTER_OPTIONS_BY
// FILTER_OPTIONS_BY action.payload will have both: objects and arrays to return new object here
function filterObject(state={}, action) {
  const { payload } = action;
  // return new state without arrays by id's that are not passed by action payload
  return state;
}

// this is general helper function, called from array slice reducers on action FILTER_OPTIONS_BY
// FILTER_OPTIONS_BY action.payload will have both: objects and arrays to return new array here
// in jsx implement autofill cell value if the length of list is 1 after filterList
function filterList(state=[], action) {
  const { payload } = action;
  // return new state without arrays by id's that are not passed by action payload
  return state;
}


function gradesByGradeStd(state={}, action) {
  const { payload } = action;
  console.log(payload);
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.gradesByGradeStd;
    case FILTER_OPTIONS_BY_GRADE_STDS: return filterObject(state, action);
    default: return state;
  }
}

function gradeStdsByGrade(state={}, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.gradeStdsByGrade;
    case FILTER_OPTIONS_BY_GRADE_STDS: return filterObject(state, action);
    default: return state;
  }
}

function allGradesStds(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.allGradesStds;
    case FILTER_OPTIONS_BY_GRADE_STDS: return filterList(state, action);
    default: return state;
  }
}

function allGrades(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.allGrades;
    case FILTER_OPTIONS_BY_GRADE_STDS: return filterList(state, action);
    default: return state;
  }
}




function sizesByProfile(state={}, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.sizesByProfile;
    case FILTER_OPTIONS_BY_PROFILES: return filterObject(state, action);
    default: return state;
  }
}

function allProfiles(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.allProfiles;
    case FILTER_OPTIONS_BY_PROFILES: return filterList(state, action);
    default: return state;
  }
}

function allSizes(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.allSizes;
    case FILTER_OPTIONS_BY_PROFILES: return filterList(state, action);
    default: return state;
  }
}




function profilesByToleranceStds(state={}, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.profilesByToleranceStds;
    case FILTER_OPTIONS_BY_TOLERANCE_STDS: return filterObject(state, action);
    default: return state;
  }
}

function toleranceStdsByProfile(state={}, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.toleranceStdsByProfile;
    case FILTER_OPTIONS_BY_TOLERANCE_STDS: return filterObject(state, action);
    default: return state;
  }
}

function allToleranceStds(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.allToleranceStds;
    case FILTER_OPTIONS_BY_TOLERANCE_STDS: return filterList(state, action);
    default: return state;
  }
}



function surfaceStdsByProfiles(state={}, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.surfaceStdsByProfiles;
    case FILTER_OPTIONS_BY_PROFILES: return filterObject(state, action);
    default: return state;
  }
}

function allSurfaceStds(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.allSurfaceStds;
    case FILTER_OPTIONS_BY_PROFILES: return filterList(state, action);
    default: return state;
  }
}



function surfaceClassesBySurfaceStds(state={}, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.surfaceClassesBySurfaceStds;
    case FILTER_OPTIONS_BY_SURFACE_STDS: return filterObject(state, action);
    default: return state;
  }
}

function allSurfaceClasses(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_MATERIALS_FROM_DB: return payload.allSurfaceClasses;
    case FILTER_OPTIONS_BY_SURFACE_STDS: return filterList(state, action);
    default: return state;
  }
}



function stockMaterialsById(state={}, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_STOCK_MATERIALS_FROM_DB: return payload.stockMaterialsById;
    case FILTER_STOCK_MATERIALS_BY: return filterObject(state, action);
    default: return state;
  }
}

function stockMaterialsAllIds(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_STOCK_MATERIALS_FROM_DB: return payload.stockMaterialsAllIds;
    case FILTER_STOCK_MATERIALS_BY: return filterList(state, action);
    default: return state;
  }
}




const materialsReducer = combineReducers({
  gradesByGradeStd, // grades grouped into standards accordingly
  gradeStdsByGrade, // standards grouped into grades accordingly
  allGradesStds, // array of all grade standards
  allGrades, // collection of all grades from gradesByGradeStds

  sizesByProfile, // sizes grouped into profiles accordingly
  allProfiles, // array of all profiles
  allSizes, // collection of all sizes from sizesByProfile

  profilesByToleranceStds, // profiles grouped by tolerance standards
  toleranceStdsByProfile, // tolerance standards grouped by profiles
  allToleranceStds, // array of all tolerance standards

  surfaceStdsByProfiles, // surface standards grouped by profiles
  allSurfaceStds, // array of all surface standards

  surfaceClassesBySurfaceStds, // surface classes grouped by surface standards
  allSurfaceClasses, // array of all surface classes

  stockMaterialsById, // object of stock materials, fetched according some or all criterias above in row of cell being edited
  stockMaterialsAllIds, // array of all stock materials, fetched according some or all criterias above in row of cell being edited
});

export default materialsReducer;
