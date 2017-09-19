
import _ from 'lodash';
import { db } from './fake-db2'; // for now, instead of db

// 1st action for automated parts data import from specified files directory
export const FIND_PARTS_FROM_FILES = 'FIND_PARTS_FROM_FILES'; // parse tables from pdf or xls or dwg
// 2nd action for automated parts data import from specified files directory
export const FETCH_PARTS_FROM_FILES = 'FETCH_PARTS_FROM_FILES'; // write parsed data into state.productParts
// 1st and 2nd actions for automated parts data import called only if product is empty -
// this is to avoid inserted parts data overriding.

export const FETCH_PRODUCTS_FROM_DB = 'FETCH_PRODUCTS_FROM_DB';
export const FETCH_PARTS_FROM_DB = 'FETCH_PARTS_FROM_DB'; // fake db implemented
export const FETCH_MATERIALS_FROM_DB = 'FETCH_MATERIALS_FROM_DB';
export const FETCH_COMPL_FROM_DB = 'FETCH_COMPL_FROM_DB';
export const FETCH_PROFILES_FROM_DB = 'FETCH_PROFILES_FROM_DB';
export const FETCH_PROCESSES_FROM_DB = 'FETCH_PROCESSES_FROM_DB';

export const WRITE_PARTS_TO_DB = 'WRITE_PARTS_TO_DB';

export const ADD_PART = 'ADD_PART';
export const EDIT_CELL = 'EDIT_CELL';

export function editCell(part, propertyName, newValue) {
  const partzzz = db.parts;
  const partsObject = partzzz.byId;
  const changedPart = partsObject[part.id];
  // console.log(db.parts.byId[part.id][propertyName]);
  changedPart[propertyName] = newValue;
  const newPartsObject = Object.assign({}, partsObject, {
        propertyName: changedPart
      })// { ...parts, part.id: changedPart };
  const parts = Object.assign({}, partzzz, {
    byId: newPartsObject
  })



  console.log(parts.byId[part.id][propertyName]);

  console.log(parts);
  return {
    type: EDIT_CELL,
    payload: parts
  }
}

export function fetchProductsFromDB() {
  const products = db.products;
  return {
    type: FETCH_PRODUCTS_FROM_DB,
    payload: products
  }
}

export function fetchPartsFromDB(products) {
  // fetch data from db
  // db data will have normalized structure like app state
  const parts = db.parts; // instead of request promise to db
  return {
    type: FETCH_PARTS_FROM_DB,
    payload: parts // for now, instead request from server db
  };
}

export function fetchMaterialsFromDB(products) {
  const materials = db.materials;
  // need to use promise here, if async is not practice in reducers
  return {
    type: FETCH_MATERIALS_FROM_DB,
    payload: materials
  }
}

export function fetchComplFromDB(products) {
  const compl = db.compl;
  return {
    type: FETCH_COMPL_FROM_DB,
    payload: compl
  }
}

export function fetchProfilesFromDB(products) {
  const profiles = db.profiles;
  return {
    type: FETCH_PROFILES_FROM_DB,
    payload: profiles
  }
}

export function fetchProcessesFromDB(products) {
  const processes = db.processes;
  return {
    type: FETCH_PROCESSES_FROM_DB,
    payload: processes
  }
}

/*
export function findPartsFromFiles(files) {
  // fetch data from documents
  // files or folder to be dragged from explorer and dropped to table area by user

  return {
    type: FIND_PARTS_FROM_FILES,
    payload: request
  };
}

export function fetchPartsFromFiles(files) {
  // promise to: write data into array or tableData object
  // pass promise via middleware to reducer as payload
  return {
    type: FETCH_PARTS_FROM_FILES,
    payload: parts
  }
}

export function writePartsToDB(parts) {
  // write data from parts Redux state into db
  // make promise to: write data into array or tableData object
  // const request = axios.post(url);
  // pass promise via middleware to reducer as payload
  return {
    type: WRITE_PARTS_TO_DB,
    payload: request
  }
}
*/
