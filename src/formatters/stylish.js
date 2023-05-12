import _ from 'lodash';

const shiftLeft = 2;
const startIndent = 4;

const calcIntend = (nestedLevel, left = 0) => ' '.repeat(nestedLevel * startIndent - left);

const stringify = (object, nestedLevel) => {
  const createStylishNode = (node, nestedLvl) => {
    const nodeArray = Object.entries(node).map((eachNode) => {
      const [name, value] = eachNode;
      if (_.isPlainObject(value)) {
        return `${calcIntend(nestedLvl)}${name}: {\n${createStylishNode(value, nestedLvl + 1)}\n${calcIntend(nestedLvl)}}`;
      }
      return `${calcIntend(nestedLvl)}${name}: ${value}`;
    });
    return nodeArray.join('\n');
  };
  return `{\n${createStylishNode(object, nestedLevel + 1)}\n${calcIntend(nestedLevel)}}`;
};

const createStylishDifference = (data) => {
  const createStylishNode = (node, nestedLevel = 1) => {
    const getNodeValue = (value, nestedLvl) => (_.isPlainObject(value)
      ? stringify(value, nestedLvl) : value);

    switch (node.type) {
      case 'nested':
        return `${calcIntend(nestedLevel)}${node.name}: {\n${node.children.flatMap(
          (nestedNode) => createStylishNode(nestedNode, nestedLevel + 1),
        ).join('\n')}\n${calcIntend(nestedLevel)}}`;
      case 'added':
        return `${calcIntend(nestedLevel, shiftLeft)}+ ${node.name}: ${getNodeValue(node.value, nestedLevel)}`;
      case 'deleted':
        return `${calcIntend(nestedLevel, shiftLeft)}- ${node.name}: ${getNodeValue(node.value, nestedLevel)}`;
      case 'unchanged':
        return `${calcIntend(nestedLevel, shiftLeft)}  ${node.name}: ${getNodeValue(node.value, nestedLevel)}`;
      case 'updated':
        return [
          `${calcIntend(nestedLevel, shiftLeft)}- ${node.name}: ${getNodeValue(node.value1, nestedLevel)}`,
          `${calcIntend(nestedLevel, shiftLeft)}+ ${node.name}: ${getNodeValue(node.value2, nestedLevel)}`,
        ].join('\n');
      default:
        return new Error(node.type);
    }
  };

  return `{\n${data.flatMap((child) => createStylishNode(child)).join('\n')}\n}`;
};

export default createStylishDifference;
