import _ from 'lodash';

const createPlainDifference = (data) => {
  const createPlainNode = (node, path = []) => {
    const pathToNode = [...path, node.name];
    const stringify = (value) => (typeof value === 'string' ? `'${value}'` : value);
    const getNodeValue = (value) => (_.isPlainObject(value) ? '[complex value]' : stringify(value));

    switch (node.type) {
      case 'nested':
        return node.children.map((nestedNode) => createPlainNode(nestedNode, pathToNode)).filter(Boolean).join('\n');
      case 'added':
        return `Property '${pathToNode.join('.')}' was added with value: ${getNodeValue(node.value)}`;
      case 'deleted':
        return `Property '${pathToNode.join('.')}' was removed`;
      case 'updated':
        return `Property '${pathToNode.join('.')}' was updated. From ${getNodeValue(node.value1)} to ${getNodeValue(node.value2)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(node.type);
    }
  };

  return data.map((nestedNode) => createPlainNode(nestedNode)).filter(Boolean).join('\n');
};

export default createPlainDifference;
