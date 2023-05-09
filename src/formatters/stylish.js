import _ from 'lodash';

const lb = '\n';
const shiftLeft = 2;
const startIndent = 4;

const calcIntend = (nestedLevel, left = 0) => ' '.repeat(nestedLevel * startIndent - left);
const createStylishValue = (value, nestedLevel) => `{${lb}${value}${lb}${calcIntend(nestedLevel)}}`;
const createStylishObject = (object, name, nestedLevel) => `${calcIntend(nestedLevel)}${name}: ${createStylishValue(object, nestedLevel)}`;
const createStylishProperty = (key, value, nestedLevel, status = ' ') => `${calcIntend(nestedLevel, shiftLeft)}${status} ${key}: ${value}`;

const stylish = (file) => {
  const createImmutableObject = (object, nestedLevel) => {
    const iter = (node, nested) => {
      const eachValue = Object.entries(node).map((child) => {
        const [key, value] = child;
        if (_.isPlainObject(value)) {
          return createStylishObject(iter(value, nested + 1), key, nested);
        }
        return `${calcIntend(nested)}${key}: ${value}`;
      });
      return eachValue.join(lb);
    };
    return createStylishValue(iter(object, nestedLevel + 1), nestedLevel);
  };

  const iter = (node, nestedLevel = 1) => {
    const {
      name, type, children, value,
    } = node;

    switch (type) {
      case 'nested':
        return createStylishObject(children.flatMap(
          (child) => iter(child, nestedLevel + 1),
        ).join(lb), name, nestedLevel);
      case 'add': {
        const content = _.isPlainObject(value) ? createImmutableObject(value, nestedLevel) : value;
        return createStylishProperty(name, content, nestedLevel, '+');
      }
      case 'delete': {
        const content = _.isPlainObject(value) ? createImmutableObject(value, nestedLevel) : value;
        return createStylishProperty(name, content, nestedLevel, '-');
      }
      case 'unchanged':
        return createStylishProperty(name, value, nestedLevel);
      case 'updated':
        return children.flatMap((child) => iter({ ...child, name }, nestedLevel)).join(lb);
      default:
        return new Error(type);
    }
  };

  return `{${lb}${file.flatMap((child) => iter(child)).join(lb)}${lb}}`;
};

export default stylish;
