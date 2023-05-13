import _ from 'lodash';

const startIndent = 4;
const shiftLeft = 2;

const calcIntend = (depth, left = 0) => ' '.repeat(depth * startIndent - left);

const stringify = (value, depth) => {
  const createStylishNode = (node, nodeDepth) => {
    const nodeArray = Object.entries(node).map((eachNode) => {
      const [nodeName, nodeValue] = eachNode;
      if (_.isPlainObject(nodeValue)) {
        return `${calcIntend(nodeDepth)}${nodeName}: {\n${createStylishNode(nodeValue, nodeDepth + 1)}\n${calcIntend(nodeDepth)}}`;
      }
      return `${calcIntend(nodeDepth)}${nodeName}: ${nodeValue}`;
    });
    return nodeArray.join('\n');
  };
  return _.isPlainObject(value) ? `{\n${createStylishNode(value, depth + 1)}\n${calcIntend(depth)}}` : value;
};

const createStylishDifference = (data) => {
  const createStylishNode = (node, depth = 1) => {
    switch (node.type) {
      case 'nested':
        return `${calcIntend(depth)}${node.name}: {\n${node.children.flatMap(
          (nestedNode) => createStylishNode(nestedNode, depth + 1),
        ).join('\n')}\n${calcIntend(depth)}}`;
      case 'added':
        return `${calcIntend(depth, shiftLeft)}+ ${node.name}: ${stringify(node.value, depth)}`;
      case 'deleted':
        return `${calcIntend(depth, shiftLeft)}- ${node.name}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${calcIntend(depth, shiftLeft)}  ${node.name}: ${stringify(node.value, depth)}`;
      case 'updated':
        return [
          `${calcIntend(depth, shiftLeft)}- ${node.name}: ${stringify(node.value1, depth)}`,
          `${calcIntend(depth, shiftLeft)}+ ${node.name}: ${stringify(node.value2, depth)}`,
        ].join('\n');
      default:
        return new Error(node.type);
    }
  };

  return `{\n${data.flatMap((nestedNode) => createStylishNode(nestedNode)).join('\n')}\n}`;
};

export default createStylishDifference;
