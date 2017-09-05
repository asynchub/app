import { combineReducers } from 'redux';
import TableData from 'reducer-table-data';

const rootReducer = combineReducers({
  tableData: TableData
});

export default rootReducer;
