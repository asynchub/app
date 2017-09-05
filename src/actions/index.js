export const READ_SOURCE_FILE_TREE = 'READ_SOURCE_FILE_TREE';
export const WRITE_TABLE_DATA_TO_DB = 'WRITE_TABLE_DATA_TO_DB';

export function readSourceFileTree(files) {
  // fetch data from documents
  // promise to: write data into array or tableData object
  // const request = axios.get(url);
  // pass promise via middleware to reducer as payload
  return {
    type: READ_SOURCE_FILE_TREE,
    payload: request
  };
}

export function writeTableDataToDB(tableData) {
  // write data from tableData Redux state into db
  // make promise to: write data into array or tableData object
  // const request = axios.post(url);
  // pass promise via middleware to reducer as payload
  return {
    type: WRITE_TABLE_DATA_TO_DB,
    payload: request
  }
} 
