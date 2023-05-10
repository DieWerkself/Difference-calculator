import _ from 'lodash';

const content = (value) => (_.isPlainObject(value) ? '[complex value]' : JSON.stringify(value));

const plain = (file) => {
  const iter = (node, path = []) => {
    const {
      name, children, value,
    } = node;
    const string = [...path, name];

    switch (node.type) {
      case 'nested':
        return children.map((child) => iter(child, string)).filter(Boolean).join('\n');
      case 'added':
        return `Property '${string.join('.')}' was added with value: ${content(value)}`.replace(/"/g, "'");
      case 'deleted':
        return `Property '${string.join('.')}' was removed`;
      case 'updated':
        return `Property '${string.join('.')}' was updated. From ${content(value[0])} to ${content(value[1])}`.replace(/"/g, "'");
      case 'unchanged':
        return null;
      default:
        throw new Error(node.type);
    }
  };

  return file.map((child) => iter(child)).filter(Boolean).join('\n');
};

export default plain;
