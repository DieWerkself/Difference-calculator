import _ from 'lodash';

const shiftLeft = 2;
const startIndent = 4;

const calcIntend = (nestedLevel, left = 0) => ' '.repeat(nestedLevel * startIndent - left);

const stylish = (file) => {
  const createImmutableObject = (object, nestedLevel) => {
    const iter = (node, nested) => {
      const eachValue = Object.entries(node).map((child) => {
        const [name, value] = child;
        if (_.isPlainObject(value)) {
          return `${calcIntend(nested)}${name}: {\n${iter(value, nested + 1)}\n${calcIntend(nested)}}`;
        }
        return `${calcIntend(nested)}${name}: ${value}`;
      });
      return eachValue.join('\n');
    };
    return `{\n${iter(object, nestedLevel + 1)}\n${calcIntend(nestedLevel)}}`;
  };

  const content = (value, nested) => (_.isPlainObject(value)
    ? createImmutableObject(value, nested) : value);

  const iter = (node, nestedLevel = 1) => {
    const {
      name, children, value,
    } = node;

    switch (node.type) {
      case 'nested':
        return `${calcIntend(nestedLevel)}${name}: {\n${children.flatMap(
          (child) => iter(child, nestedLevel + 1),
        ).join('\n')}\n${calcIntend(nestedLevel)}}`;
      case 'added': {
        return `${calcIntend(nestedLevel, shiftLeft)}+ ${name}: ${content(value, nestedLevel)}`;
      }
      case 'deleted': {
        return `${calcIntend(nestedLevel, shiftLeft)}- ${name}: ${content(value, nestedLevel)}`;
      }
      case 'unchanged':
        return `${calcIntend(nestedLevel, shiftLeft)}  ${name}: ${content(value, nestedLevel)}`;
      case 'updated':
        return `${calcIntend(nestedLevel, shiftLeft)}- ${name}: ${content(value[0], nestedLevel)}\n${calcIntend(nestedLevel, shiftLeft)}+ ${name}: ${content(value[1], nestedLevel)}`;
      default:
        return new Error(node.type);
    }
  };

  return `{\n${file.flatMap((child) => iter(child)).join('\n')}\n}`;
};

export default stylish;
