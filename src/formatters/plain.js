import _ from 'lodash';

const content = (value) => (_.isPlainObject(value) ? '[complex value]' : JSON.stringify(value));

const plain = (file) => {
  const iter = (node, path = []) => {
    const {
      name, type, children, value,
    } = node;
    const string = [...path, name];

    switch (type) {
      case 'nested':
        return children.map((child) => iter(child, string)).filter(Boolean).join('\n');
      case 'add':
        return `Property '${string.join('.')}' was added with value: ${content(value)}`;
      case 'delete':
        return `Property '${string.join('.')}' was removed`;
      case 'updated':
        return `Property '${string.join('.')}' was updated. From ${children.map((child) => content(child.value)).join(' to ')}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(type);
    }
  };

  return file.map((child) => iter(child)).filter(Boolean).join('\n').replaceAll(/"/g, "'");
};

export default plain;
