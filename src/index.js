import findDifference from './lib/difference.js';
import stylize from './formatters/stylish.js';

const mainLogic = (file1, file2) => {
  const difference = findDifference(file1, file2);
  const styledDifference = stylize(difference);
  return styledDifference;
};

export default mainLogic;
