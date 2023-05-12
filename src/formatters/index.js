import stylish from './stylish.js';
import plain from './plain.js';

const formatterSelect = (data, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      return new Error(`Unknown formatter: ${formatterName}`);
  }
};

export default formatterSelect;
