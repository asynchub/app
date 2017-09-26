import _ from 'lodash';

export function generateId() { // here: this must be static id generator
  return _.random(1, 1000000); // convert it to string
}
