export const READ_SOURCE_FILE_TREE = 'READ_SOURCE_FILE_TREE';

export function readSourceFileTree(files) {
  // fetch data from documents
  // pass data to reducer as payload
  return {
    type: READ_SOURCE_FILE_TREE,
    payload: data
  };
}
