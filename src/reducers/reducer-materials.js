import { combineReducers } from 'redux';

import {
  FETCH_MATERIALS_FROM_DB
}

const materialsReducer = combineReducers({
  gradesByGradeStd, // grades grouped into standards accordingly
  allGradesStds, // array of grade standards
  allGrades, // collection of all grades from gradesByGradeStds
  
  sizesByProfile, // sizes grouped into profiles accordingly
  allProfiles, // array of profiles
  allSizes, // collection of all sizes from sizesByProfile
  
  profilesByToleranceStds,
  
  toleranceStds,
  surfaceStds,
  
  surfaceClasses,
})

export default materialsReducer;
