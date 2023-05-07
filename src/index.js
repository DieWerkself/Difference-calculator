import findDifference from './lib/difference.js';
import stylish from './formatters/stylish.js';

const mainLogic = (file1, file2, formatter = 'stylish') => {
  const difference = findDifference(file1, file2);
  switch (formatter) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return '';
    default:
      return new Error(formatter);
  }
};

export default mainLogic;
