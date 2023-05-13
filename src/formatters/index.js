import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      return new Error(`Unknown formatter: ${formatter}`);
  }
};

export default format;
