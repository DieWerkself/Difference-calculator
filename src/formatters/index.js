import stylish from './stylish.js';
import plain from './plain.js';

const diff = (file, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(file);
    case 'plain':
      return plain(file);
    case 'json':
      return JSON.stringify(file);
    default:
      return new Error(formatName);
  }
};

export default diff;
