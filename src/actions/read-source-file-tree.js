export const READ_SOURCE_FILE_TREE = 'READ_SOURCE_FILE_TREE';

export function readSourceFileTree(files) {
  // fetch data from documents
  // promise to: write data into array or tableData object
  // const promise = axios.request(url);
  // pass promise via middleware to reducer as payload
  return {
    type: READ_SOURCE_FILE_TREE,
    payload: promise
  };
}
