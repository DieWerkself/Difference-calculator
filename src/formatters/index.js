import findDifference from '../difference.js';
import stylish from './stylish.js';
import plain from './plain.js';

const diff = (file1, file2, formatName = 'stylish') => {
  const diffFile = findDifference(file1, file2);
  switch (formatName) {
    case 'stylish':
      return stylish(diffFile);
    case 'plain':
      return plain(diffFile);
    case 'json':
      return JSON.stringify(diffFile);
    default:
      return new Error(formatName);
  }
};

export default diff;
