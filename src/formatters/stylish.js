import _ from 'lodash';

const stylish = (file) => {
  const depth = 4;
  const calcDepth = (dept) => ' '.repeat(dept);
  const isObject = (obj) => _.isPlainObject(obj);

  const createObject = (node, dept) => {
    if (!isObject(node)) return node;

    const eachValue = Object.entries(node).map((child) => {
      const [key, value] = child;
      if (isObject(value)) {
        return `${calcDepth(dept)}${key}: {\n${createObject(value, dept + 4)}\n${calcDepth(dept)}}`;
      }
      return `${calcDepth(dept)}${key}: ${value}`;
    });
    return eachValue.join('\n');
  };

  const iter = (dept, node) => {
    const {
      name,
      type,
      children,
      value,
      status,
    } = node;

    switch (type) {
      case 'object':
        return `${calcDepth(dept)}${name}: {\n${children.flatMap((child) => iter(dept + 4, child)).join('')}${calcDepth(dept)}}\n`;
      case 'changed': {
        const str = isObject(value) ? `{\n${createObject(value, dept + 4)}\n${calcDepth(dept)}}` : value;
        return `${calcDepth(dept - 2)}${status} ${name}: ${str}\n`;
      }
      case 'unchanged':
        return `${calcDepth(dept - 2)}  ${name}: ${value}\n`;
      default:
        return new Error(type);
    }
  };

  const result = file.flatMap((child) => iter(depth, child)).join('');

  return `{\n${result}}`;
};

export default stylish;
