export const READ_SOURCE_FILE_TREE = 'READ_SOURCE_FILE_TREE';

export function readSourceFileTree(files) {
  // fetch data from documents
  // write data into array or tableData object
  // pass data to reducer as payload
  return {
    type: READ_SOURCE_FILE_TREE,
    payload: tableData
  };
}
