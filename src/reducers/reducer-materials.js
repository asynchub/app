import { combineReducers } from 'redux';

import {
  FETCH_MATERIALS_FROM_DB
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
});

export default materialsReducer;
