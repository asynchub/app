import { combineReducers } from 'redux';
import productParts from './reducer-product-parts';
import productMaterials from './reducer-product-materials';

const rootReducer = combineReducers({
  parts: productParts,
  materials: productMaterials
});

export default rootReducer;
