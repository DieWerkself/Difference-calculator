import _ from 'lodash';

const plain = (file) => {
  const iter = (node, path = []) => {
    const {
      name, type, children, value, status,
    } = node;
    const string = [...path, name];

    const isObject = (obj) => _.isPlainObject(obj);
    const content = (val) => (isObject(val) ? '[complex value]' : JSON.stringify(val));

    switch (type) {
      case 'object':
        return children.map((child) => iter(child, string)).filter(Boolean).join('\n');
      case 'changed': {
        if (status === '+') return `Property '${string.join('.')}' was added with value: ${content(value)}`;
        return `Property '${string.join('.')}' was removed`;
      }
      case 'updated':
        return `Property '${string.join('.')}' was updated. From ${children.map((child) => content(child.value)).join(' to ')}`;
      case 'unchanged':
        return '';
      default:
        throw new Error(type);
    }
  };

  return file.map((child) => iter(child)).filter(Boolean).join('\n').replaceAll(/"/g, "'");
};

export default plain;
