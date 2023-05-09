import stylish from './stylish.js';
import plain from './plain.js';

const formatterSelect = (file, formaterName) => {
  switch (formaterName) {
    case 'stylish':
      return stylish(file);
    case 'plain':
      return plain(file);
    case 'json':
      return JSON.stringify(file);
    default:
      return new Error(`Unknown formatter: ${formaterName}`);
  }
};

export default formatterSelect;
